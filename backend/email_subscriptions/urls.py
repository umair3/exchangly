from django.urls import include, path
from rest_framework import routers
from .views import EmailSubscriptionViewset

router = routers.DefaultRouter()
router.register('emailsubscriptions', EmailSubscriptionViewset, 'emailsubscription')

urlpatterns = router.urls
