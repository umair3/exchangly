from django.db import models
from django.contrib.auth.models import User


class Integration(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    host = models.CharField(max_length=500)
    port = models.IntegerField()
    key = models.CharField(max_length=500)
    passphrase = models.CharField(max_length=500)
    default = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        print(self.updated)
        if self.default:
            Integration.objects.filter(user=self.user).update(default=False)
        super(Integration, self).save(force_insert=False, force_update=False, using=None, update_fields=None)
