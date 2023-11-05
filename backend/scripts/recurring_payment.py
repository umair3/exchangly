from datetime import timedelta
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from subscriptions.models import Subscription
from payments.models import Payment
from charge_options.models import ChargeOption
from payments.services import AbstractPaymentGatewayOuter
from outers.customer import Customer
from outers.payment_gateway_outer import PaymentGateway


def run(*args):
    # Get all Active subscription which have
    # expiry date < now
    # && status == ACTIVE
    subscriptions = Subscription.objects.all()
    # subscriptions = subscriptions.filter(status='ACTIVE')
    subscriptions = subscriptions.filter(status__in=('ACTIVE', 'TRIAL'))
    subscriptions = subscriptions.filter(expiry__lt=timezone.now())
    s: Subscription
    for s in subscriptions:
        charge_option: ChargeOption = ChargeOption.objects.get(id=s.chargeOptionId)
        payment_gateway: AbstractPaymentGatewayOuter = AbstractPaymentGatewayOuter.get_payment_gateway(s.payment_gateway)
        intent = payment_gateway.charge_recurring(
            Customer(s.userId).email,
            s.payment_gateway_customer_id,
            charge_option.price,
            charge_option.currency
        )
        # if intent.status == 'succeeded':
        #     if charge_option.optiontype == 'monthly':
        #         s.expiry = s.expiry + relativedelta(months=+1)
        #     elif charge_option.optiontype == 'annual':
        #         s.expiry = s.expiry + relativedelta(years=+1)
        #     s.save()
            # Email.subscription_plan_activated(customer, pricing_plan)

