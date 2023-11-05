import uuid
from .models import Subscription
from datetime import datetime
from django.utils import timezone
from charge_options.models import ChargeOption


def trial_available(user_id):
    print(f"trial_available({user_id})")
    trial_available = False
    try:
        subscriptions = Subscription.objects.filter(user=user_id)
        for subscription in subscriptions:
            if subscription.trial_status == 0:
                trial_available = True
    except Subscription.DoesNotExist:
        return True
    return trial_available


def active_subscription(user_id, items):
    print(f"active_subscription({user_id}, {items})")
    try:
        for item in items:
            charge_option_id: int = item['productId']
            print(f"charge_option_id: {charge_option_id}")
            charge_option: ChargeOption = ChargeOption.objects.get(pk=charge_option_id)
            # subscription = Subscription.objects.get(user=user_id, planId_id=charge_option.pricingplan)
            # if subscription.expiry > timezone.now() and subscription.status == 'ACTIVE':
            #     return True
            subscriptions = Subscription.objects.filter(user=user_id, plan_id=charge_option.pricing_plan)
            for subscription in subscriptions:            
                if subscription.expiry > timezone.now() and subscription.status == 'ACTIVE':
                    return True
                elif subscription.expiry > timezone.now() and subscription.status == 'TRIAL':
                    return True
    except Subscription.DoesNotExist:
        print("subscription does not exists")
    return False


def remove_pending_subscriptions(user_id):
    try:
        Subscription.objects.filter(user=user_id, status='PENDING').delete()
    except Subscription.DoesNotExist:
        return False
    return True
