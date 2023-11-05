# from django.urls import include, path
# from rest_framework import routers
# from .views import OrderViewset
#
# router = routers.DefaultRouter()
# router.register('orders', OrderViewset, 'order')
#
# urlpatterns = router.urls

from .views import OrderViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
urlpatterns = router.urls
