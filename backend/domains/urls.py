from django.urls import path
from .views import DomainViewSet, VerifyDkimView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'domains', DomainViewSet, basename='domain')
urlpatterns = router.urls

urlpatterns.append(path('domains/verify_dkim', VerifyDkimView.as_view()))
