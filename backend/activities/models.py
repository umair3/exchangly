from django.contrib.auth.models import User
from django.db import models


class Activity(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    # BILLING | AUDIENCE | CAMPAIGN | CAMPAIGN_EXECUTION | SCHEDULER | INTEGRATION | EMAIL_IDENTITY | VERIFY_DOMAIN_CREDS
    module = models.CharField(max_length=30)
    # CREATE | READ | UPDATE | DELETE | EXECUTE | PURCHASE | UPGRADE
    operation = models.CharField(max_length=30)

    # ['AUDIENCE']['CREATE'] = "You created a new audience successfully."
    # ['AUDIENCE']['UPDATE'] = "You update an audience successfully."


class ActivityDetail(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    activity = models.ForeignKey(to=Activity, on_delete=models.CASCADE)
    identifier_key = models.CharField(max_length=30)  # AUDIENCE_PK
    identifier_value = models.CharField(max_length=100)  # 1
