from django.urls import path
from rest_framework import routers
from .views import AudienceViewSet, AudienceBulkViewSet, AudienceStatsView

router = routers.SimpleRouter()
router.register('audience', AudienceViewSet, 'audience')
router.register('audience_bulk', AudienceBulkViewSet, 'audience_bulk')
urlpatterns = router.urls

urlpatterns.append(path('audience_stats', AudienceStatsView.as_view(), name='audience_stats'))
