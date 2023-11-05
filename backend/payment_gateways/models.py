from django.contrib.auth.models import User
from django.db import models

PAYMENT_GATEWAY_CHOICES = (
    ("2checkout", "2Checkout"),
    ("paystack", "Paystack"),
    ("stripe", "Stripe"),
)


class PaymentGateway(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    title = models.CharField(max_length=10, choices=PAYMENT_GATEWAY_CHOICES)
    customer_id = models.CharField(max_length=50)
    auth_code = models.CharField(max_length=50, blank=True, null=True)

    unique_together = [['user', 'title']]
