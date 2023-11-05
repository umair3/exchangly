from django.db import models
from pricing_plans.models import PricingPlan
from charge_options.models import ChargeOption


class Coupon(models.Model):
    code = models.CharField(max_length=6, blank=False)
    generated_by = models.IntegerField()
    used_by = models.IntegerField(blank=True, null=True)
    pricing_plan = models.ForeignKey(to=PricingPlan, on_delete=models.PROTECT, blank=True, null=True)
    charge_option = models.ForeignKey(to=ChargeOption, on_delete=models.PROTECT, blank=True, null=True)
    status = models.CharField(max_length=10, blank=True, null=True)
    usage_credit = models.IntegerField(blank=True, null=True, default=1)
    discount = models.IntegerField(blank=True, null=True, default=100)
