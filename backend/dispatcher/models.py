from django.db import models
from django.contrib.auth.models import User


class Dispatcher(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    account = models.ForeignKey(to=User, on_delete=models.CASCADE)
    sender = models.EmailField()
    receiver = models.EmailField()
    subject = models.CharField(max_length=200, blank=False, default='')
    body = models.TextField()
    paramsJSON = models.JSONField()
    # status = # PENDING | SENT | DELIVERED | OPENED | CLICKED
