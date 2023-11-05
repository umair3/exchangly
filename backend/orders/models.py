from django.db import models
from charge_options.models import ChargeOption
from pricing_plans.models import PricingPlan


class Order(models.Model):
    user = models.IntegerField(blank=False, default=0)
    email = models.CharField(max_length=100, blank=True, default='')
    promo = models.CharField(max_length=100, blank=True, null=True, default='')
    sub_total = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    discount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    tax = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    total = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    status = models.CharField(max_length=10, blank=True, default='incomplete')
    currency = models.CharField(max_length=3, blank=True)
    recurring_amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    discount_with_recurring_coupon = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    coupon_usage_credit = models.IntegerField(blank=True, default=1)
    total_with_recurring_coupon = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    unit_price = models.DecimalField(decimal_places=2, max_digits=10)
    quantity = models.IntegerField(blank=True, default=1)
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    plan = models.ForeignKey(to=PricingPlan, on_delete=models.PROTECT)
    chargeOption = models.ForeignKey(to=ChargeOption, on_delete=models.PROTECT)
    order = models.ForeignKey(to=Order, on_delete=models.PROTECT)
    expiry = models.DateTimeField(blank=True, null=True)
    trial = models.IntegerField(blank=True, default=0, null=True)
    recurring_amount = models.DecimalField(decimal_places=2, max_digits=10)
    discount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    discount_with_recurring_coupon = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    coupon_usage_credit = models.IntegerField(blank=True, default=0)
    recurring_amount_with_coupon = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
