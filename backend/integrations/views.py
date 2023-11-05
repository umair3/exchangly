from rest_framework import viewsets, permissions
from .models import Integration
from .serializers import IntegrationSerializer


class IntegrationViewSet(viewsets.ModelViewSet):
    serializer_class = IntegrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def _set_user_in_request_data(self):
    #     setattr(self.request.data, '_mutable', True)
    #     self.request.data['user'] = self.request.user.pk
    #     setattr(self.request.data, '_mutable', False)
    #     return self.request

    def get_queryset(self):
        user = self.request.user
        queryset = Integration.objects.filter(user=user)
        return queryset

    # def create(self, request, *args, **kwargs):
    #     request = self._set_user_in_request_data()
    #     return super().create(request, *args, **kwargs)
    #
    # def update(self, request, *args, **kwargs):
    #     request = self._set_user_in_request_data()
    #     return super().create(request, *args, **kwargs)
