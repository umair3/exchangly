from dateutil.relativedelta import relativedelta
from charge_options.models import ChargeOption
from coupons.models import Coupon
from coupons.utils import coupon_discount
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from dispatcher.services import DispatcherService
from email_templates.models import UserEmailTemplate
from mmbe.settings import STRIPE_API_KEY, EMAIL
from orders.services import OrderItemService
from outers.customer import Customer
from outers.email_outer import AbstractEmailOuter
from payments.services import PaymentWebHookHandler
from payment_methods.services import PaymentMethodService
from pricing_plans.models import PricingPlan
from subscriptions.models import Subscription
from .models import Payment, PaymentEvent
from .services import PaymentService
import datetime
import decimal
import json
import stripe


stripe.api_key = STRIPE_API_KEY


# http://a9136bf923d1b41528dbe71ce4316d30-196000538.eu-west-2.elb.amazonaws.com

#
# class PaymentWebhook(generics.):
#     serializer_class = None
#
#     def post(self, request, *args, **kwargs):
#         print(f"Payment.Webhook({self}, {request}, {args}, {kwargs})")
#         payload = request.body
#         event = None
#         try:
#             event = stripe.Event.construct_from(
#                 json.loads(payload), stripe.api_key
#             )
#         except ValueError as e:
#             # Invalid payload
#             return Response(status=400)
#         # Handle the event
#         if event.type == 'payment_intent.succeeded':
#             payment_intent = event.data.object  # contains a stripe.PaymentIntent
#             print('PaymentIntent was successful!')
#         elif event.type == 'payment_method.attached':
#             payment_method = event.data.object  # contains a stripe.PaymentMethod
#             print('PaymentMethod was attached to a Customer!')
#             # ... handle other event types
#         else:
#             print('Unhandled event type {}'.format(event.type))
#         return Response(status=200)
#         # serializer = self.get_serializer(data=request.data)
#         # print(type(serializer))
#         # serializer.is_valid(raise_exception=True)
#         # customer = serializer.create(serializer.validated_data)
#         # Mails.send_verification_email(customer)
#         # return Response({
#         #     "user": UserSerializer(
#         #         customer,
#         #         context=self.get_serializer_context()
#         #     ).data,
#         #     "message": "User Created Successfully.  Now perform Login to get your token",
#         # }, 201)

def log_web_hook(request):
    print(f"Request: {request}")
    print(f"Request.body: {request.body}")
    print(f"Request POST: {request.POST}")
    pe = PaymentEvent()
    # pe.type = event.type
    pe.payload = request.body
    pe.post_data = json.dumps(request.POST)
    pe.save()
    # if request.POST.get("_uuid") != uuid:  # match referrer here too, one referrer for one uuid.
    #     return HttpResponse(status=403, headers=headers, content="Forbidden")
    # params = {}
    # for key in request.POST:
    #     params["{{" + key + "}}"] = request.POST[key]


def mark_coupon_used(user_id: int, coupon_id: int, status: str):
    try:
        coupon = Coupon.objects.get(pk=coupon_id)
        coupon.usedBy = user_id
        if coupon.usageCredit and coupon.usageCredit > 0:
            coupon.usageCredit = decimal.Decimal(coupon.usageCredit) - 1
        coupon.status = status
        coupon.save()
        PaymentService.cancel_payment_intents_by_coupon(coupon)
    except Coupon.DoesNotExist:
        pass


def activate_subscription(subscription: Subscription):
    subscription.status = 'ACTIVE'
    charge_option: ChargeOption = ChargeOption.objects.get(id=subscription.charge_option_id)
    subscription.expiry = OrderItemService.calculate_expiry(charge_option.option_type)
    subscription.save()
    if subscription.coupon:
        mark_coupon_used(subscription.user, subscription.coupon.pk, 'USED')
    return subscription


def activate_subscription_trial(subscription: Subscription):
    subscription.status = 'TRIAL'
    subscription.trialStatus = 1
    charge_option: ChargeOption = ChargeOption.objects.get(id=subscription.chargeOptionId_id)
    subscription.expiry = OrderItemService.calculate_expiry(charge_option.optiontype)
    subscription.save()
    if subscription.coupon:
        mark_coupon_used(subscription.userId, subscription.coupon.pk, 'PENDING')
    return subscription


@csrf_exempt
def my_webhook_view(request):
    log_web_hook(request)
    payload = request.body
    event = None
    try:
        event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)

    if event.type == 'payment_intent.amount_capturable_updated':
        """
        This event can occur for following use-cases;
        1. Trial Order Payment (update subscription, payment, order)
        2. Add payment method (update payment method, payment)
        """
        payment_intent = event.data.object  # contains a stripe.PaymentIntent
        print(f"payment_intent.amount_capturable_updated: {payment_intent.id}")
        payment = Payment.objects.get(paymentIntentId=payment_intent.id)
        payment.status = 'uncaptured'
        payment.save()
        user_id = payment.userId
        user = User.objects.get(pk=user_id)
        customer = Customer(user)
        PaymentMethodService.get_or_create(
            pg_payment_method_id=payment_intent.payment_method,
            user=user
        ).mark_verified().mark_active()
        # Decide what type of payment is it? PAYMENT_TYPE = ORDER | WITHOUT_ORDER
        if payment.order:
            order_id = payment.order
            subscriptions = Subscription.objects.filter(userId=user_id, order_id=order_id)
            for subscription in subscriptions:
                subscription.payment_gateway = 'stripe'
                subscription.save()
                print(f"payment.order={payment.order}")
                order_has_trial = OrderItemService.with_trial(payment.order)
                print(f"order_has_trial={order_has_trial}")
                if order_has_trial:
                    activate_subscription_trial(subscription)
                else:
                    activate_subscription(subscription)
                charge_option: ChargeOption = ChargeOption.objects.get(id=subscription.chargeOptionId_id)
                # subscription.expiry = OrderItemService.calculate_expiry(charge_option.optiontype)
                pricing_plan = PricingPlan.objects.get(pk=subscription.plan_id)
                # EmailOuter.subscription_plan_activated(customer, pricing_plan)
                email_outer: AbstractEmailOuter = AbstractEmailOuter.get_mail_service(key=EMAIL['NAME'])
                params = {
                    "PARAM_FIRST_NAME": customer.first_name,
                    "PARAM_LAST_NAME": customer.last_name,
                    "PARAM_SUBSCRIPTION_PLAN_TITLE": pricing_plan.title
                }
                template: UserEmailTemplate = UserEmailTemplate.objects.get(pk=3)
                dispatcher = DispatcherService(
                    account=user,
                    email_outer=email_outer,
                    to=customer.email,
                    subject=template.subject,
                    data=""
                ).prepare_email(template, params).dispatch()

    elif event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object  # contains a stripe.PaymentIntent
        print(f"payment_intent.succeeded id: {payment_intent.id}")
        print(f"payment_intent.payment_method: {payment_intent.payment_method}")
        payment = Payment.objects.get(paymentIntentId=payment_intent.id)
        payment.status = 'complete'
        payment.save()
        user_id = payment.userId
        order_id = payment.order
        user = User.objects.get(pk=user_id)
        PaymentMethodService.get_or_create(
            pg_payment_method_id=payment_intent.payment_method,
            user=user
        ).mark_verified().mark_active()
        customer = Customer(user)
        subscriptions = Subscription.objects.filter(user=user_id, order=order_id)
        for subscription in subscriptions:
            # subscription.payment_gateway = 'stripe'
            # subscription.save()
            activate_subscription(subscription)
            pricing_plan = PricingPlan.objects.get(pk=subscription.plan_id)
            email_outer: AbstractEmailOuter = AbstractEmailOuter.get_mail_service(key=EMAIL['NAME'])
            params = {
                "PARAM_FIRST_NAME": customer.first_name,
                "PARAM_LAST_NAME": customer.last_name,
                "PARAM_SUBSCRIPTION_PLAN_TITLE": pricing_plan.title
            }
            template: UserEmailTemplate = UserEmailTemplate.objects.get(pk=3)
            dispatcher = DispatcherService(
                account=user,
                email_outer=email_outer,
                to=customer.email,
                subject=template.subject,
                data=""
            ).prepare_email(template, params).dispatch()
    elif event.type == 'payment_method.attached':
        payment_method = event.dataobject  # contains a stripe.PaymentMethod
        print('PaymentMethod was attached to a Customer!')
        # ... handle other event types
    elif event.type == 'payment_intent.payment_failed':
        payment_intent = event.data.object
        print(f"payment_intent.succeeded id: {payment_intent.id}")
        payment = Payment.objects.get(paymentIntentId=payment_intent.id)
        payment.status = 'failed'
        payment.save()
    elif event.type == 'payment_intent.processing':
        payment_intent = event.data.object
        print(f"payment_intent.succeeded id: {payment_intent.id}")
        payment = Payment.objects.get(paymentIntentId=payment_intent.id)
        payment.status = 'processing'
        payment.save()
    elif event.type == 'payment_intent.requires_action':
        payment_intent = event.data.object
        print(f"payment_intent.succeeded id: {payment_intent.id}")
        payment = Payment.objects.get(paymentIntentId=payment_intent.id)
        payment.status = 'requires_action'
        payment.save()
    elif event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object
        print(f"payment_intent.succeeded id: {payment_intent.id}")
        pwh = PaymentWebHookHandler(payload)
        pwh.handle_payment_intent_succeeded()

    elif event.type == 'payment_method.attached':
        payment_method = event.dataobject  # contains a stripe.PaymentMethod
        print('PaymentMethod was attached to a Customer!')
        # ... handle other event types
    else:
        print('Unhandled event type {}'.format(event.type))
    return HttpResponse(status=200)


@csrf_exempt
def paystack_webhook_view(request):
    """
    Webhook for PayStack to handle following events
        charge.dispute.create	A dispute was logged against your business
        charge.dispute.remind	A logged dispute has not been resolved
        charge.dispute.resolve	A dispute has been resolved
        charge.success	A successful charge was made (HANDLED)
        customeridentification.failed	A customer ID validation has failed
        customeridentification.success	A customer ID validation was successful
        invoice.create	An invoice has been created for a subscription on your account. This usually happens 3 days before the subscription is due or whenever we send the customer their first pending invoice notification
        invoice.payment_failed	A payment for an invoice failed
        invoice.update	An invoice has been updated. This usually means we were able to charge the customer successfully. You should inspect the invoice object returned and take necessary action
        paymentrequest.pending	A payment request has been sent to a customer
        paymentrequest.success	A payment request has been paid for
        subscription.create	A subscription has been created
        subscription.disable	A subscription on your account has been disabled
        subscription.expiring_cards	Contains information on all subscriptions with cards that are expiring that month. Sent at the beginning of the month, to merchants using Subscriptions
        subscription.not_renew	A subscription on your account's status has changed to non-renewing. This means the subscription will not be charged on the next payment date
        transfer.failed	A transfer you attempted has failed
        transfer.success	A successful transfer has been completed
        transfer.reversed	A transfer you attempted has been reversed
    """
    log_web_hook(request)
    payload = json.loads(request.body)
    print(payload)
    if payload['event'] == 'charge.success':
        print(f"charge.success: {payload['data']}")
        payment = Payment.objects.get(paymentIntentId=payload['data']['reference'])
        payment.status = 'complete'
        payment.save()
        user_id = payment.userId
        order_id = payment.order
        user = User.objects.get(pk=user_id)
        customer = Customer(user)
        subscriptions = Subscription.objects.filter(userId=user_id, order_id=order_id)
        for subscription in subscriptions:
            subscription.payment_gateway = 'paystack'
            subscription.paymentGatewayCustomerId = payload['data']['customer']['id']
            subscription.payment_gateway_auth_code = payload['data']['authorization']['authorization_code']
            subscription.save()
            order_has_trial = OrderItemService.with_trial(payment.order)
            if order_has_trial:
                activate_subscription_trial(subscription)
            else:
                activate_subscription(subscription)
            pricing_plan = PricingPlan.objects.get(pk=subscription.planId_id)
            email_outer: AbstractEmailOuter = AbstractEmailOuter.get_mail_service(key=EMAIL['NAME'])
            params = {
                "PARAM_FIRST_NAME": customer.first_name,
                "PARAM_LAST_NAME": customer.last_name,
                "PARAM_SUBSCRIPTION_PLAN_TITLE": pricing_plan.title
            }
            template: UserEmailTemplate = UserEmailTemplate.objects.get(pk=3)
            dispatcher = DispatcherService(
                account=user,
                email_outer=email_outer,
                to=customer.email,
                subject=template.subject,
                data=""
            ).prepare_email(template, params).dispatch()
    else:
        payment = Payment.objects.get(paymentIntentId=payload['data']['reference'])
        payment.status = 'failed'
        payment.save()
    return HttpResponse(status=200)
