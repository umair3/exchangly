from rest_framework import routers
from .views import ActivityViewSet, ActivityDetailViewSet

router = routers.SimpleRouter()
router.register('activities', ActivityViewSet, 'activity')
router.register('activity_details', ActivityDetailViewSet, 'activity_detail')
urlpatterns = router.urls
