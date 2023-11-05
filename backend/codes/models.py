from datetime import datetime, timedelta, timezone
from django.contrib.auth.models import User
from django.db import models
from random import randint
# from dateutil import parser
# from django.utils.dateformat import DateFormat


class Code(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    code = models.IntegerField(blank=False)
    expiry = models.DateTimeField(blank=False)
    status = models.BooleanField(blank=True, default=False)

    @staticmethod
    def default_expiry():
        return datetime.now(timezone.utc) + timedelta(days=1)
        # return DateFormat(datetime.now() + timedelta(days=1)).format("Y-m-d H:i[:s[.u]][TZ]")

    @staticmethod
    def generate_code() -> int:
        return randint(100000, 999999)
