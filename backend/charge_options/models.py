from django.db import models
from pricing_plans.models import PricingPlan


STATUS_CHOICES = (
    ("PUBLISH", "Publish"),
    ("HIDE", "Hide")
)


class ChargeOption(models.Model):
    option_type = models.CharField(max_length=500, blank=False, default='')
    price = models.DecimalField(blank=False, default=0.00, decimal_places=2, max_digits=9)
    currency = models.CharField(max_length=3, blank=False, default='USD')
    pricing_plan = models.ForeignKey(to=PricingPlan, on_delete=models.CASCADE)
    country = models.CharField(max_length=2, blank=False, default='US')
    bundle_only = models.BooleanField(default=False)
    recurring = models.BooleanField(default=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PUBLISH')  # PUBLISH | HIDE
    order = models.IntegerField(default=0)
    upsell = models.ForeignKey('self', models.PROTECT, blank=True, null=True)
    upsell_discount = models.DecimalField(blank=True, default=0.00, decimal_places=2, max_digits=9)
    upsell_message = models.CharField(max_length=500, blank=True, default='')

    def __str__(self):
        return f"{self.pricing_plan.title} {self.option_type} {self.currency}"
