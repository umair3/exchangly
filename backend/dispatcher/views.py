from rest_framework import viewsets, permissions
from .models import Dispatcher
from .serializers import DispatcherSerializer


class DispatcherViewSet(viewsets.ModelViewSet):
    queryset = Dispatcher.objects.all().order_by('-updated')
    serializer_class = DispatcherSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'head']

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(account=user)
        receiver = self.request.query_params.get('receiver', None)
        if receiver:
            queryset = queryset.filter(receiver=receiver)
        return queryset
