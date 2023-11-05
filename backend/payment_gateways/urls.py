from django.urls import path
from rest_framework import routers
from .views import PaymentGatewayViewSet

router = routers.SimpleRouter()
router.register('payment_gateways', PaymentGatewayViewSet, 'payment_gateway')
urlpatterns = router.urls
