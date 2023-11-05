from django.urls import include, path
from rest_framework import routers
from .views import EmailTemplateViewSet, UserEmailTemplateViewSet

router = routers.DefaultRouter()
router.register('email_templates', EmailTemplateViewSet, 'template')
router.register('user_email_templates', UserEmailTemplateViewSet, 'user_template')

urlpatterns = router.urls
