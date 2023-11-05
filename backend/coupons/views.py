from rest_framework import viewsets, permissions
from .models import Coupon
from .serializers import CouponSerializer
from .utils import generate_code
from pricing_plans.models import PricingPlan
from charge_options.models import ChargeOption
from rest_framework.response import Response


class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Coupon.objects.all()
        generated_by = self.request.query_params.get('generatedBy', None)
        if generated_by is not None:
            queryset = queryset.filter(generatedBy=generated_by)
        return queryset

    def create(self, request, *args, **kwargs):
        coupon = Coupon()
        coupon.code = generate_code()
        coupon.generatedBy = request.data["generatedBy"]
        coupon.usageCredit = 1
        coupon.discount = 100
        # coupon.used = False
        # coupon.used_by = request.data["used_by"]
        if request.data["pricingPlan"]:
            coupon.pricingPlan = PricingPlan.objects.get(pk=request.data["pricingPlan"])
        if request.data["chargeOption"]:
            coupon.chargeOption = ChargeOption.objects.get(pk=request.data["chargeOption"])
        coupon.save()
        return Response(
            CouponSerializer(coupon).data,
            201
        )
