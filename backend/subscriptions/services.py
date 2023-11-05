from business.services.log import Log
from charge_options.models import ChargeOption
from datetime import datetime
from django.contrib.auth.models import User
from django.db.models import Q
from orders.models import Order, OrderItem
from outers.customer import Customer
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter
from outers.payment_gateway_outer import PaymentIntent
from payments.services import PaymentService
from payment_gateways.models import PaymentGateway
from .dataclasses import Price
from .exceptions import CannotCancelPendingSubscriptionException, SubscriptionAlreadyCancelledException, \
    SubscriptionNotExpiredException
from .models import Subscription
import pytz
import time


class SubscriptionService:
    def __init__(self, s: Subscription):
        self.subscription: Subscription = s

    def extend(self, expire_time) -> PaymentIntent:
        """
        Trigger payment to extend subscription only if the subscription is already expired.
        # %d/%m/%Y %H:%M:%S
        # 2022-11-12 09:15:32
        # SecretKey123
        # "YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ]"
        """
        utc = pytz.UTC
        expire_time = utc.localize(datetime.strptime(expire_time, "%Y-%m-%d %H:%M:%S"))
        print(f"expire_time: {expire_time}")
        if self.subscription.expiry > expire_time:
            raise SubscriptionNotExpiredException
        user: User = User.objects.get(pk=self.subscription.user)
        # There can be only one active payment gateway
        print(f"self.subscription.user: {self.subscription.user}")
        payment_gateway: PaymentGateway = PaymentGateway.objects.get(user=self.subscription.user)
        intent: PaymentIntent = PaymentService.create_recurring_payment_intent(
            AbstractPaymentGatewayOuter.get_payment_gateway(payment_gateway.title),
            Customer(user=user),
            self.subscription,
            self.subscription.charge_option
        )
        return intent

    @staticmethod
    def extend_all(expire_time):
        subscriptions = Subscription.objects.all()
        subscriptions = subscriptions.filter(status='ACTIVE')
        subscriptions = subscriptions.filter(expiry__lt=expire_time)
        # if kwargs['run_as_on_date']:
        #     subscriptions = subscriptions.filter(expiry__lt=kwargs['run_as_on_date'])
        s: Subscription
        for s in subscriptions:
            SubscriptionService(s).extend(expire_time)

    # @staticmethod
    # def with_trial(subscription: Subscription):
    #     subscription.status = 'TRIAL'
    #     subscription.trialStatus = 1
    #     subscription.save()
    #     if subscription.coupon:
    #         pass

    @staticmethod
    def create_pending_subscription(user_id: int, order: Order, order_item: OrderItem):
        subscription = Subscription()
        subscription.planId = order_item.plan
        subscription.userId = user_id
        subscription.status = "PENDING"
        subscription.chargeOptionId = order_item.chargeOption
        subscription.trialStatus = order_item.trial
        subscription.expiry = order_item.expiry
        # subscription.paymentGatewayCustomerId = payment_gateway_customer['id']
        subscription.order = order
        subscription.save()

    @staticmethod
    def extend_during(start, end):
        subscriptions = Subscription.objects.all()
        # subscriptions = subscriptions.filter(status='ACTIVE')
        subscriptions.filter(Q(status='TRIAL') | Q(status='ACTIVE'))
        subscriptions = subscriptions.filter(expiry__gt=start)
        # subscriptions = subscriptions.filter(expiry__gt='2022-04-01 00:00')
        subscriptions = subscriptions.filter(expiry__lt=end)
        print(f"subscriptions.query: {subscriptions.query}")
        print(f"subscriptions: {subscriptions}")
        s: Subscription
        exceptions = []
        for s in subscriptions:
            print(f"s: {s}")
            print(f"s.id: {s.id}")
            user: User = User.objects.get(pk=s.user)
            if user.is_active:
                try:
                    charge_option: ChargeOption = ChargeOption.objects.get(id=s.charge_option_id)
                    payment_gateway: AbstractPaymentGatewayOuter = AbstractPaymentGatewayOuter.get_payment_gateway(s.payment_gateway)
                    payment: PaymentIntent = PaymentService.create_recurring_payment_intent(
                        payment_gateway,
                        Customer(user),
                        s,
                        s.charge_option)
                except Exception as e:
                    print(f"Exeption: {e}")
                    Log().error()
                    #exceptions.append(e)
                    continue
                time.sleep(2)
        if exceptions.__len__() > 0:
            pass


    def cancel_subscription(self):
        print(f"SubscriptionService.cancel_subscription({self.s})")
        if self.s.status in ['TRIAL', 'ACTIVE']:
            self.s.status = "CANCELLED"
            self.s.save()
            return True
        elif self.s.status == 'PENDING':
            raise CannotCancelPendingSubscriptionException
        elif self.s.status == 'CANCELLED':
            raise SubscriptionAlreadyCancelledException
        return False


    @staticmethod
    def get_price(s: Subscription) -> Price:
        charge_option: ChargeOption = ChargeOption.objects.get(id=s.charge_option_id)
        price: Price = Price(amount=charge_option.price, currency=charge_option.currency)
        # if s.installment:
        #     # installment: Installment = Installment.objects.get(id=s.installment)
        #     # Django is lazy loading the installment object. Let's try to skip the manual query.
        #     installment: Installment = s.installment
        #     price.amount = installment.amount
        return price