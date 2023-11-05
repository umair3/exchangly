from django.contrib import admin
from .models import ChargeOption
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class ChargeOptionResource(resources.ModelResource):
    class Meta:
        model = ChargeOption


class ChargeOptionAdmin(ImportExportModelAdmin):
    resource_class = ChargeOptionResource
    list_display = ['id', 'option_type', 'pricing_plan', 'currency', 'price', 'bundle_only', 'recurring', 'status',
                    'order']
    list_filter = ('country', 'option_type', 'pricing_plan', 'recurring')


# Register your models here.
admin.site.register(ChargeOption, ChargeOptionAdmin)

