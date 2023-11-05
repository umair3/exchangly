from django.urls import include, path
from rest_framework import routers
from .views import PricingPlanViewSet

router = routers.DefaultRouter()
router.register('pricing_plans', PricingPlanViewSet, 'pricing_plan')

urlpatterns = router.urls
