from django.db import models


class Tag(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    title = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return f"{self.pk}: {self.title.capitalize()}"

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        title = str(self.title)
        self.title = title.lower()
        super().save(force_insert=False, force_update=False, using=None, update_fields=None)