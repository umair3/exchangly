from django.contrib import admin
from .models import PricingPlan, Addon
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class PricingAdmin(admin.ModelAdmin):
    pass


class PricingResource(resources.ModelResource):
    class Meta:
        model = PricingPlan


class PricingAdmin(ImportExportModelAdmin):
    resource_class = PricingResource
    list_display = ['id', 'title', 'plan_type', 'access_type', 'trialDurationInDays', 'is_addon', 'status', 'order']
    list_filter = ('plan_type', 'access_type', 'is_addon', 'status')


class AddonAdmin(admin.ModelAdmin):
    list_display = ['id', 'parent', 'pricing']
    # list_filter = ('country',)


# Register your models here.
admin.site.register(PricingPlan, PricingAdmin)
admin.site.register(Addon, AddonAdmin)
