from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from .models import PricingPlan
from .serializers import PricingPlanSerializer


class PricingPlanViewSet(viewsets.ModelViewSet):
    queryset = PricingPlan.objects.filter(is_addon=False, status='PUBLISH').order_by('order', 'id')
    serializer_class = PricingPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        # queryset = PricingPlan.objects.filter(addon=False)
        queryset = self.queryset
        plan_type = self.request.query_params.get('plan_type', None)
        if plan_type is not None:
            queryset = queryset.filter(plantype=plan_type)
        return queryset

    def get_object(self):
        print(f"PricingPlanViewSet.get_object({self}, {self.request}, {self.args}, {self.kwargs})")
        return get_object_or_404(PricingPlan, pk=self.kwargs.get('pk'))
        # return PricingPlan.objects.get(status='PUBLISH', pk=self.kwargs.get('pk'))
