from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import EmailTemplate, UserEmailTemplate


class EmailTemplateResource(resources.ModelResource):
    class Meta:
        model = EmailTemplate


class EmailTemplateAdmin(ImportExportModelAdmin):
    resource_class = EmailTemplateResource
    list_display = ['id', 'subject', 'status', 'order']


# Register your models here.
admin.site.register(EmailTemplate, EmailTemplateAdmin)
admin.site.register(UserEmailTemplate)
