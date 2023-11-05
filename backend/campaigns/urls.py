from rest_framework import routers
from .views import CampaignViewSet, CampaignTagViewSet, CampaignExecutionViewSet, CampaignExecutionLogViewSet, CampaignJobViewSet

router = routers.SimpleRouter()
router.register('campaigns', CampaignViewSet, 'campaign')
# router.register('campaign_audience', CampaignTagViewSet, 'campaign_audience')
router.register('campaign_tags', CampaignTagViewSet, 'campaign_tag')
router.register('campaign_executions', CampaignExecutionViewSet, 'campaign_execution')
router.register('campaign_execution_logs', CampaignExecutionLogViewSet, 'campaign_execution_log')
router.register('campaign_jobs', CampaignJobViewSet, 'campaign_job')

urlpatterns = router.urls
