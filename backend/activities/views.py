from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Activity, ActivityDetail
from .serializers import ActivitySerializer, ActivityDetailSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get']

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(user=self.request.user)
        module = self.request.query_params.get('module', None)
        if module:
            queryset = queryset.filter(module=module)
        return queryset


class ActivityDetailViewSet(viewsets.ModelViewSet):
    queryset = ActivityDetail.objects.all()
    serializer_class = ActivityDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get']

    def get_queryset(self):
        queryset = self.queryset.filter(user=self.request.user)
        activity_id = self.request.query_params.get('activity', None)
        if activity_id:
            queryset = queryset.filter(activity__id=activity_id)
        return queryset
