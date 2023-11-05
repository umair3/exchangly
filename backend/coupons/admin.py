from django.contrib import admin
from .models import Coupon
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class CouponResource(resources.ModelResource):
    class Meta:
        model = Coupon


class CouponAdmin(ImportExportModelAdmin):
    resource_class = CouponResource


admin.site.register(Coupon, CouponAdmin)
