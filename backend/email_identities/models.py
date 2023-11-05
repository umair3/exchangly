from django.db import models
from django.contrib.auth.models import User


class EmailIdentity(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    email = models.EmailField(blank=False, null=False)
    status = models.BooleanField(blank=True, default=False)
    default = models.BooleanField(default=False)
    first_name = models.CharField(blank=False, null=False, max_length=20)
    last_name = models.CharField(blank=False, null=False, max_length=20)

    class Meta:
        unique_together = [('user', 'email')]

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        print(self.updated)
        if self.default:
            EmailIdentity.objects.filter(user=self.user).update(default=False)
        super(EmailIdentity, self).save(force_insert=False, force_update=False, using=None, update_fields=None)
