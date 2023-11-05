from charge_options.models import ChargeOption
from coupons.models import Coupon
from orders.models import Order
from orders.services import OrderItemService
from payments.models import Payment, PaymentEvent
from outers.customer import Customer
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter, PaymentGateway, PaymentIntent, PayStack, Stripe
from subscriptions.models import Subscription
from .exceptions import PaymentGatewayDoesNotExistException
import decimal


class PaymentService:

    @staticmethod
    def create_payment(
            payment_gateway: str,
            payment_intent: PaymentIntent,
            payment_gateway_customer,
            order: Order = None
    ) -> Payment:
        print(f"PaymentService.create_payment({payment_intent})")
        payment = Payment()
        payment.order_id = order.pk
        payment.currency = order.currency
        payment.amount = order.total
        payment.paymentGateway = payment_gateway
        payment.paymentGatewayClientSecret = payment_intent.client_secret
        payment.authorization_url = payment_intent.authorization_url
        payment.paymentGatewayCustomerId = payment_gateway_customer
        payment.paymentIntentId = payment_intent.id
        payment.userId = order.user
        payment.save()
        return payment

    @staticmethod
    def verify_card(payment_gateway_customer, currency):
        intent = PaymentGateway.charge(
            payment_gateway_customer,
            100,
            'USD',  # currency,
            'manual'
        )
        return intent

    @staticmethod
    def charge(customer: Customer, payment_gateway_customer, amount, currency, payment_gateway: AbstractPaymentGatewayOuter):
        print(f"PaymentService.charge({customer}, {payment_gateway_customer}, {amount}, {currency}, {payment_gateway})")
        intent = payment_gateway.charge(
            customer,
            payment_gateway_customer,
            amount,
            currency,
            'automatic'
        )
        return intent

    @staticmethod
    def create_customer(customer: Customer, order_id, payment_gateway: AbstractPaymentGatewayOuter):
        payment_gateway_customer = payment_gateway.create_customer(
            customer.email,
            customer.first_name,
            customer.last_name,
            str(order_id)
        )
        return payment_gateway_customer

    @staticmethod
    def create_recurring_payment_intent(payment_gateway: AbstractPaymentGatewayOuter, customer: Customer,
                                        subscription: Subscription, charge_option: ChargeOption) -> PaymentIntent:
        print(f"create_recurring_payment_intent({payment_gateway}, {customer}, {subscription}, {charge_option})")
        intent = payment_gateway.charge_recurring(
            customer.email,
            subscription.payment_gateway_customer_id,
            charge_option.price,
            charge_option.currency
        )
        print(f"create_recurring_payment_intent.intent={intent}")
        if intent is not None:
            payment = Payment()
            payment.order_id = subscription.order_id
            payment.currency = charge_option.currency
            payment.amount = charge_option.price
            payment.paymentGatewayClientSecret = intent.client_secret
            payment.paymentGatewayCustomerId = subscription.payment_gateway_customer_id
            payment.paymentIntentId = intent.id
            payment.userId = subscription.user
            payment.save()
        return intent

    @staticmethod
    def cancel_payment_intents_by_coupon(coupon: Coupon):
        print(f"PaymentService.cancel_payment_intents_by_coupon({coupon})")
        orders = Order.objects.filter(promo=coupon.code)
        for order in orders:
            try:
                payments = Payment.objects.filter(order=order)
                for payment in payments:
                    if payment.status != 'complete' and payment.status != 'cancelled':
                        if PaymentGateway.cancel_payment_intent(payment.paymentIntentId) is True:
                            payment.status = 'cancelled'
                            payment.save()
            except Payment.DoesNotExist:
                pass

    @staticmethod
    def cancel_payment_intents_by_orders(orders):
        print(f"PaymentService.cancel_payment_intents_by_orders({orders})")
        for order in orders:
            try:
                payments = Payment.objects.filter(order_id=order.pk)
                for payment in payments:
                    if payment.status != 'complete' and payment.status != 'cancelled':
                        PaymentGateway.cancel_payment_intent(payment.paymentIntentId)
                        payment.status = 'cancelled'
                        payment.save()
            except Payment.DoesNotExist:
                pass

    @staticmethod
    def cancel_payment_intent_by_payment_status(payment: Payment, payment_status):
        if payment.status == payment_status:
            PaymentGateway.cancel_payment_intent(payment.paymentIntentId)

    @staticmethod
    def get_payment_gateway(key: str):
        if key == "stripe":
            return Stripe()
        elif key == "paystack":
            return PayStack()
        else:
            raise PaymentGatewayDoesNotExistException


class PaymentWebHookHandler:

    def __init__(self, payload):
        self.payload = payload

    def parse_payload(self) -> Payment:
        event = PaymentGateway.parse_payload(self.payload)
        payment_intent = event.data.object  # contains a stripe.PaymentIntent
        payment: Payment = Payment.objects.get(paymentIntentId=payment_intent.id)
        payment_event = PaymentEvent()
        payment_event.userId = payment.userId
        payment_event.type = event.type
        payment_event.payload = self.payload
        payment_event.save()
        return payment

    def handle_payment_intent_amount_capturable_updated(self):
        payment: Payment = self.parse_payload()
        payment.status = 'uncaptured'
        payment.save()
        subscription: Subscription = Subscription.objects.get(user=payment.userId)
        order_has_trial = OrderItemService.with_trial(payment.order)
        if order_has_trial:
            subscription.status = 'TRIAL'
            subscription.trialStatus = 1
        else:
            subscription.status = 'ACTIVE'
            subscription.trialStatus = 0
        # charge_option: ChargeOption = ChargeOption.objects.get(id=subscription.chargeOptionId_id)
        # subscription.expiry = OrderItemService.calculate_expiry(charge_option.optiontype)
        subscription.save()
        if subscription.coupon:
            try:
                coupon = Coupon.objects.get(pk=subscription.coupon.pk)
                coupon.usedBy = payment.userId
                coupon.status = 'PENDING'
                coupon.save()
                PaymentService.cancel_payment_intents_by_coupon(coupon)
            except Coupon.DoesNotExist:
                pass
        # pricing_plan = PricingPlan.objects.get(pk=subscription.planId_id)
        # customer = Customer(user_id)
        # Email.subscription_plan_activated(customer, pricing_plan)

    @staticmethod
    def handle_payment_intent_payment_failed(payment: Payment):
        pass

    @staticmethod
    def handle_payment_intent_processing(payment: Payment):
        pass

    @staticmethod
    def handle_payment_intent_payment_requires_action(payment: Payment):
        pass

    def handle_payment_intent_succeeded(self):
        payment: Payment = self.parse_payload()
        payment.status = 'complete'
        payment.save()

        user_id = payment.userId
        subscription = Subscription.objects.get(user=user_id)
        subscription.status = 'ACTIVE'

        charge_option: ChargeOption = ChargeOption.objects.get(id=subscription.charge_option_id)
        subscription.expiry = OrderItemService.calculate_expiry(charge_option.option_type)
        subscription.save()
        if subscription.coupon:
            try:
                coupon = Coupon.objects.get(pk=subscription.coupon.pk)
                coupon.usedBy = user_id
                if coupon.usageCredit and coupon.usageCredit > 0:
                    coupon.usageCredit = decimal.Decimal(coupon.usageCredit) - 1
                coupon.status = 'USED'
                coupon.save()
                PaymentService.cancel_payment_intents_by_coupon(coupon)
            except Coupon.DoesNotExist:
                pass
        # pricing_plan = PricingPlan.objects.get(pk=subscription.planId_id)
        # customer = Customer(user_id)
        # Email.subscription_plan_activated(customer, pricing_plan)


