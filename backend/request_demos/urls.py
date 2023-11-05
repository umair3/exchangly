from django.urls import include, path
from rest_framework import routers
from .views import RequestDemoViewset

router = routers.DefaultRouter()
router.register('requestdemos', RequestDemoViewset, 'requestdemo')

urlpatterns = router.urls
