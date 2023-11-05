from django.contrib.auth.models import User
from django.db import models
from payment_gateways.models import PaymentGateway


class PaymentMethod(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    payment_gateway = models.ForeignKey(to=PaymentGateway, on_delete=models.PROTECT)
    pg_payment_method_id = models.CharField(max_length=50)
    verified = models.BooleanField(default=False)
    active = models.BooleanField(default=False)

    def mark_active(self):
        PaymentMethod.objects.filter(active=True, user=self.user).update(active=False)
        self.active = True
        self.save()
        return self

    def mark_verified(self):
        self.verified = True
        self.save()
        return self
