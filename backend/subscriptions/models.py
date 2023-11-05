from django.db import models
from django.utils import timezone
from pricing_plans.models import PricingPlan
from charge_options.models import ChargeOption
from orders.models import Order, OrderItem
from coupons.models import Coupon


class Subscription(models.Model):
    user = models.IntegerField(blank=False)
    plan = models.ForeignKey(to=PricingPlan, on_delete=models.PROTECT)
    access_type = models.CharField(max_length=20, blank=False, default='PLAN')  # PLAN | CONSULTANT | FORMS2API
    charge_option = models.ForeignKey(to=ChargeOption, on_delete=models.PROTECT)
    expiry = models.DateTimeField(blank=False, null=False)
    status = models.CharField(max_length=50, blank=False)
    status_update_time = models.DateTimeField(auto_now_add=True)
    trial_status = models.CharField(max_length=50, blank=True)
    payment_gateway = models.CharField(max_length=15, blank=False, null=False)
    payment_gateway_customer_id = models.CharField(max_length=200, blank=True, default='')
    # Auth code is required for future payments on cards.
    payment_gateway_auth_code = models.CharField(max_length=50, blank=True, null=True)
    order = models.ForeignKey(to=Order, on_delete=models.PROTECT)
    coupon = models.ForeignKey(to=Coupon, on_delete=models.PROTECT, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # Premium | $65/monthly | Renew on November 3, 2022 | ACTIVE | Cancel Button.
    # Hire a Consultant | 500$/month | Renew on November 6, 2022 | ACTIVE | Cancel Button.
    # Forms2Email | 5$/month | Renew on November 3, 2022 | ACTIVE| Cancel Button.
    # status can have PENDING | ACTIVE | CANCELED | EXPIRED (expired is only set from frontend)

    def create_pending(self, user_id: int, order: Order, order_item: OrderItem, pg_customer_id):
        self.plan = order_item.plan
        self.user = user_id
        self.status = "PENDING"
        self.status_update_time = timezone.now()
        self.charge_option = order_item.chargeOption
        self.trial_status = order_item.trial
        self.expiry = order_item.expiry
        self.payment_gateway_customer_id = pg_customer_id
        self.order = order
        self.access_type = order_item.plan.access_type
        self.save()
