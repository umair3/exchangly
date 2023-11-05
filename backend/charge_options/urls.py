from django.urls import include, path
from rest_framework import routers
from .views import ChargeOptionViewSet

router = routers.DefaultRouter()
router.register('charge_options', ChargeOptionViewSet, 'charge_option')

urlpatterns = router.urls
