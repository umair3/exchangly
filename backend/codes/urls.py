from django.urls import include, path
from rest_framework import routers
from .views import CodeViewSet

router = routers.DefaultRouter()
router.register('codes', CodeViewSet, 'code')
urlpatterns = router.urls

# urlpatterns = [
#       path('api/testimonials', TestimonialViewSet),
# ]
