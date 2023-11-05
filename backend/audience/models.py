from django.contrib.auth.models import User
from django.db import models
from tags.models import Tag
from django.contrib.sessions.models import Session


class Audience(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    email = models.EmailField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20)
    tags = models.ManyToManyField(to=Tag, blank=True)

    # def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
    #     print(f"{self.user}")
    #     print(Session.session_data)
    #     super().save(force_insert, force_update, using, update_fields)

    # def get_deferred_fields(self):
    #     pass
    #
    # def __getattr__(self, item):
    #     pass

    def get_user_total_audience_count(self):
        self.objects.count()

