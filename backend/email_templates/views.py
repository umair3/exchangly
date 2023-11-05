from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .models import EmailTemplate, UserEmailTemplate
from .serializers import EmailTemplateSerializer, UserEmailTemplateSerializer


class EmailTemplateViewSet(viewsets.ModelViewSet):
    queryset = EmailTemplate.objects.filter(status='PUBLISH')
    serializer_class = EmailTemplateSerializer


class UserEmailTemplateViewSet(viewsets.ModelViewSet):
    queryset = UserEmailTemplate.objects.all()
    serializer_class = UserEmailTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        user: User = self.request.user
        print(f"user: {user}")
        queryset = queryset.filter(user=user.pk)
        return queryset
