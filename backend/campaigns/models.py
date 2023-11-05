from django.contrib.auth.models import User
from django.db import models
from audience.models import Audience
from tags.models import Tag


class Campaign(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    title = models.CharField(max_length=200)
    from_email = models.EmailField(blank=False, null=False, default='')
    # make it optional and in the API get emails instead of ids and store ids in the db
    # tag, audience
    # 0, 0,false [not implemented]
    # 1, 0,true
    # 0, 1,true
    # 1, 1,true
    to_audience = models.ManyToManyField(to=Audience, blank=True, null=True)
    to_tags = models.ManyToManyField(to=Tag, blank=True, null=True)
    email_subject = models.CharField(max_length=998, blank=False, null=False, default='')  # RFC 2822
    # Preview text appears in the inbox after the subject line.
    # https://mailchimp.com/help/about-preview-text/?_ga=2.53067498.375396090.1649430367-833502181.1649430367
    email_preview_text = models.CharField(max_length=150, blank=False, null=False, default='')
    email_body = models.TextField(blank=False, null=False, default='')


class CampaignTag(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    campaign = models.ForeignKey(to=Campaign, on_delete=models.PROTECT)
    tag = models.ForeignKey(to=Tag, on_delete=models.PROTECT)


class CampaignAudience(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    campaign = models.ForeignKey(to=Campaign, on_delete=models.PROTECT)
    audience = models.ForeignKey(to=Audience, on_delete=models.PROTECT)


class CampaignExecution(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    campaign = models.ForeignKey(to=Campaign, on_delete=models.PROTECT)
    status = models.CharField(max_length=20)


# class CampaignExecutionAudience(models.Model):
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)
#     user = models.ForeignKey(to=User, on_delete=models.PROTECT)
#     campaign_execution = models.ForeignKey(to=CampaignExecution, on_delete=models.PROTECT)
#     audience = models.ForeignKey(to=Audience, on_delete=models.PROTECT)


class CampaignExecutionLog(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    campaign_execution = models.ForeignKey(to=CampaignExecution, on_delete=models.PROTECT)
    email = models.EmailField()
    status = models.CharField(max_length=20)  # SENT | OPENED


class CampaignJob(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    campaign = models.ForeignKey(to=Campaign, on_delete=models.PROTECT)
    minute = models.CharField(max_length=1, default='*')
    hour = models.CharField(max_length=1, default='*')
    day_of_month = models.CharField(max_length=1, default='*')
    month = models.CharField(max_length=1, default='*')
    day_of_week = models.CharField(max_length=1, default='*')
    max_executions = models.IntegerField(default=0)
    current_executions = models.IntegerField(default=0)
