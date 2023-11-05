from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .models import Domain
from .serializers import DomainSerializer, VerifyDkimSerializer


class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user: User = self.request.user
        queryset = self.queryset.filter(user=user.pk)
        return queryset


class VerifyDkimView(generics.GenericAPIView):
    # serializer_class = VerifyDkimSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self):
        print(f"VerifyDkimView({self})")
        user: User = self.request.user
        domain_id = self.request.data.get('domain_id')
        return Response({
            "message": "DKIM verification failed."
        }, 400)



