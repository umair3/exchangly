from rest_framework import routers
from .views import TagViewSet

router = routers.SimpleRouter()
router.register('tags', TagViewSet, 'tag')
urlpatterns = router.urls
