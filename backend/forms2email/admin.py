from django.contrib import admin
from .models import EmailForm


class EmailFormAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'to', 'admin_template', 'send_user_email', 'user_template']
    list_filter = ('user', 'to')

# Register your models here.
admin.site.register(EmailForm, EmailFormAdmin)
