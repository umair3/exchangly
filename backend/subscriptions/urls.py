from django.urls import include, path
from rest_framework import routers
from .views import SubscriptionViewSet, SubscriptionExtensionViewSet, SubscriptionExtensionRecurringViewSet, SubscriptionExpiryViewSet, SubscriptionCancelViewSet

router = routers.DefaultRouter()
router.register('subscriptions', SubscriptionViewSet, 'subscription')

urlpatterns = router.urls

# urlpatterns.append(path('subscription', SubscriptionViewSet.as_view({'get': 'subscription'})))
# urlpatterns.append(path('subscription/', SubscriptionViewSet.as_view({'get': 'subscription'})))
urlpatterns.append(path('subscriptions/extend', SubscriptionExtensionViewSet.as_view()))
urlpatterns.append(path('subscriptions/extend-recurring', SubscriptionExtensionRecurringViewSet.as_view()))
urlpatterns.append(path('subscriptions/expiry', SubscriptionExpiryViewSet.as_view()))
urlpatterns.append(path('subscriptions/cancel', SubscriptionCancelViewSet.as_view()))
