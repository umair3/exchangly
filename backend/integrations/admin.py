from django.contrib import admin
from .models import Integration
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class IntegrationResource(resources.ModelResource):
    class Meta:
        model = Integration


class IntegrationAdmin(ImportExportModelAdmin):
    resource_class = IntegrationResource


# Register your models here.
admin.site.register(Integration, IntegrationAdmin)
