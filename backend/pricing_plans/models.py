from django.db import models


STATUS_CHOICES = (
    ("PUBLISH", "Publish"),
    ("HIDE", "Hide")
)
PLAN_TYPE_CHOICES = (
    ("INDIVIDUAL", "Individual"),
    ("ENTERPRISE", "Enterprise")
)
ACCESS_TYPE_CHOICES = (
    ("PLAN", "Plan"),  # Free, Lite, Standard, Premium
    ("CONSULTANT", "Consultant"),  # Hire a Consultant
    ("FORMS2EMAIL", "Forms2Email"),  # Forms2Email
    ("NO_ACCESS", "No Access"),  # Hire a Consultant Addon
)


class PricingPlan(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=500, blank=False, default='')
    desc = models.CharField(max_length=500, blank=False, default='')
    ui_json = models.JSONField(blank=True, null=True)
    plan_type = models.CharField(max_length=20, choices=PLAN_TYPE_CHOICES, default='individual')
    access_type = models.CharField(max_length=20, choices=ACCESS_TYPE_CHOICES, default='NO_ACCESS')
    trialDurationInDays = models.IntegerField(default=7)
    is_addon = models.BooleanField(default=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PUBLISH')  # PUBLISH | HIDE
    order = models.IntegerField(default=0)
    link = models.CharField(blank=True, max_length=500)
    tag = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        # return f"{self.id}: {self.plan_type} :{self.title}"
        return self.title


class Addon(models.Model):
    parent = models.ForeignKey(to=PricingPlan, on_delete=models.PROTECT, related_name='parent')
    pricing = models.ForeignKey(to=PricingPlan, on_delete=models.PROTECT, related_name='addon')


# class Bundle(models.Model):
#     parent = models.ForeignKey(to=PricingPlan, on_delete=models.PROTECT, related_name='bundle')
#     pricing = models.ForeignKey(to=PricingPlan, on_delete=models.PROTECT, related_name='product')


