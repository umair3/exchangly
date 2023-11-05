from django.urls import path
from rest_framework import routers
from .views import PaymentMethodViewSet

router = routers.SimpleRouter()
router.register('payment_methods', PaymentMethodViewSet, 'payment_method')
urlpatterns = router.urls
