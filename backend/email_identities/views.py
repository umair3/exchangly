from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, generics
from rest_framework.response import Response

from accounts.services import AccountService
from codes.models import Code
from dispatcher.services import DispatcherService
from email_templates.models import UserEmailTemplate
from mmbe.settings import EMAIL, URL_VERIFY, URL_LOGIN
from outers.email_outer import AbstractEmailOuter
from .models import EmailIdentity
from .serializers import EmailIdentitySerializer
from .services import EmailIdentityService


class EmailIdentityViewSet(viewsets.ModelViewSet):
    queryset = EmailIdentity.objects.all()
    serializer_class = EmailIdentitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user: User = self.request.user
        queryset = self.queryset.filter(user=user.pk)
        return queryset

    def create(self, request, *args, **kwargs):
        user: User = self.request.user
        email = self.request.data.get('email')
        EmailIdentityService(user, email).send_verification_email()
        return super(EmailIdentityViewSet, self).create(request, *args, **kwargs)

    def send_verify_email(self,request, *args, **kwargs):
        print(f"EmailIdentityViewSet.send_verify_email({self})")
        user: User = self.request.user
        email = self.request.data.get('email')
        EmailIdentityService(user, email).send_verification_email()
        return Response({
            "message": "Verify Email Identity mail sent successfully."
        }, 200)


class SendEmailIdentityVerifyEmailView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self):
        print(f"ResendEmailIdentityVerifyEmailView({self})")
        user: User = self.request.user
        email = self.request.data.get('email')
        EmailIdentityService(user, email).send_verification_email()
        return Response({
            "message": "Verify Email Identity mail sent successfully."
        }, 200)
