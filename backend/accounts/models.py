from django.db import models
from django.contrib.auth.models import User
from django.db.models import OneToOneField


# class Account(User):
#     user: OneToOneField = models.OneToOneField(
#         User,
#         primary_key=True,
#         db_column="id",
#         parent_link=True,
#         on_delete=models.CASCADE
#     )
#     email_verified = models.BooleanField(default=False)
#     User.
#
#
# class Contact(models.Model):
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)
#     account = models.ForeignKey(to=Account)
#     type = models.
