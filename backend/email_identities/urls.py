from django.urls import include, path
from rest_framework import routers
from .views import EmailIdentityViewSet, SendEmailIdentityVerifyEmailView

router = routers.DefaultRouter()
router.register('email_identities', EmailIdentityViewSet, 'email_identity')
# router.register('email_identities/send-verify-email', SendEmailIdentityVerifyEmailView, 'send-verify-email')

urlpatterns = router.urls
send_verify_email = EmailIdentityViewSet.as_view({'post': 'send_verify_email'})
urlpatterns.append(path('email_identities/send-verify-email', send_verify_email, name='send-verify-email'))
