from rest_framework import routers
from .views import DispatcherViewSet

router = routers.DefaultRouter()
router.register('dispatcher', DispatcherViewSet, 'dispatcher')

urlpatterns = router.urls
