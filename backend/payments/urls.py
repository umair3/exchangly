from django.urls import include, path
from rest_framework import routers
from .views import PaymentViewSet
# from .views import PaystackPaymentViewSet
# from .views import FlutterwavePaymentViewSet
from .webhook import my_webhook_view
from .webhook import paystack_webhook_view

router = routers.DefaultRouter()
router.register('payments', PaymentViewSet, 'payment')
# router.register('paystack-payments', PaystackPaymentViewSet, 'record-payment')
# router.register('fluttewave-payments', FlutterwavePaymentViewSet, 'flutter-payment')

urlpatterns = router.urls
urlpatterns.append(
    path('payment-webhook', my_webhook_view)
)
urlpatterns.append(
    path('paystack-payment-webhook', paystack_webhook_view)
)
