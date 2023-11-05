from rest_framework import viewsets, permissions
from .models import Tag
from .serializers import TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        # user = self.request.user
        # queryset = Tag.objects.filter(user=user)
        queryset = self.queryset
        title = self.request.query_params.get('title', None)
        if title:
            queryset = queryset.filter(title__contains=title)
        return queryset

