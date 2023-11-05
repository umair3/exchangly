from django.db import models
from orders.models import Order


class Payment(models.Model):
    paymentGatewayClientSecret = models.CharField(max_length=200, blank=True, default='')  # cus_IpCAPwdQp2GvQW
    paymentIntentId = models.CharField(max_length=200, blank=True, default='')
    authorization_url = models.CharField(max_length=500, blank=True, null=True, default='')
    paymentGatewayCustomerId = models.CharField(max_length=200, blank=True, default='')
    paymentGateway = models.CharField(max_length=100, blank=True, default='')
    amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    currency = models.CharField(max_length=3, blank=True, default='USD')
    discount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    status = models.CharField(max_length=10, blank=True, default='pending')
    userId = models.IntegerField(blank=False)
    order = models.ForeignKey(to=Order, on_delete=models.PROTECT, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class PaymentEvent(models.Model):
    user = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=200, blank=True, null=True, default='')
    payload = models.TextField(blank=True, default='')
    post_data = models.TextField(blank=True, default='')
    eventMeta = models.TextField(blank=True, default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class UserPaymentMethod(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    userId = models.IntegerField(blank=False)
    payment_gateway = models.CharField(max_length=15, blank=False, null=False)  # stripe | # paystack
    authorization_code = models.CharField(max_length=50, blank=True, null=True)  # "AUTH_yxdyz9srl0" (for paystack)
    bin = models.CharField(max_length=10, blank=True, null=True)  # "408408" (for paystack)
    channel = models.CharField(max_length=20, blank=True, null=True)  # "card",
    last4 = models.CharField(max_length=4, blank=True, null=True)  # "4081"
    exp_month = models.CharField(max_length=2, blank=True, null=True)  # "12",
    exp_year = models.CharField(max_length=4, blank=True, null=True)  # "2030",
    card_type = models.CharField(max_length=50, blank=True, null=True)  # "visa ",
    bank = models.CharField(max_length=50, blank=True, null=True)  # "TEST BANK",
    country_code = models.CharField(max_length=2, blank=True, null=True)  # "NG",
    brand = models.CharField(max_length=50, blank=True, null=True)  # "visa",
    reusable = models.BooleanField()  # true,
    signature = models.CharField(max_length=50, blank=True, null=True)  # "SIG_D0Snr4ukzYBwIqN8weLH" (for paystack)

