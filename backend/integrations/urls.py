from rest_framework import routers
from .views import IntegrationViewSet

router = routers.SimpleRouter()
router.register('integrations', IntegrationViewSet, 'integration')
urlpatterns = router.urls
