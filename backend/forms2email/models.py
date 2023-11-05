from django.db import models
from django.contrib.auth.models import User
from email_templates.models import UserEmailTemplate


class EmailForm(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    to = models.EmailField(blank=False)
    reply_to = models.EmailField(blank=False)
    admin_template = models.ForeignKey(to=UserEmailTemplate, on_delete=models.PROTECT, related_name="admin_template")
    send_user_email = models.BooleanField(default=False)
    user_template = models.ForeignKey(to=UserEmailTemplate, on_delete=models.PROTECT, blank=True, null=True, related_name="user_template")
