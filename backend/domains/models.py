from django.db import models
from django.contrib.auth.models import User


class Domain(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    # RFC 1035 states that the maximum length of a DNS label is 63 characters
    name = models.CharField(max_length=63, blank=False, null=False)
    verified = models.BooleanField(default=False)
    txt_record = models.CharField(max_length=255, blank=True, null=True)
    spf_txt_record = models.CharField(max_length=255, blank=True, null=True)
    spf_verified = models.BooleanField(default=False)
    # RFC 1035 states that the maximum length of a DNS label is 63 characters
    dkim_subdomain = models.CharField(max_length=63, blank=True, null=True)
    dkim_txt_record = models.CharField(max_length=255, blank=True, null=True)
    dkim_verified = models.BooleanField(default=False)
