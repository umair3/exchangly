from json import dump

from django.db.models import Count
from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from .serializers import AudienceSerializer, AudienceListSerializer
from .models import Audience
from .services import AudienceService
from tags.models import Tag


class AudienceViewSet(viewsets.ModelViewSet):
    # queryset = Audience.objects.all()
    queryset = Audience.objects.order_by('-id')
    serializer_class = AudienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(user=user)
        status = self.request.query_params.get('status', None)
        # tags = self.request.query_params.get('tags', None)
        # ?tags=1&tags=2
        tags = self.request.query_params.getlist('tags')
        if status:
            queryset = queryset.filter(status=status)
        if tags:
            queryset = queryset.filter(tags__id__in=tags)
        return queryset


class AudienceBulkViewSet(viewsets.ViewSet):
    # queryset = Audience.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    # serializer_class = AudienceListSerializer

    # def create(self, request):
    #     user = self.request.user
    #     emails = request.data["emails"]
    #     audience = []
    #     for email in emails:
    #         audience.append(Audience(user=user, email=email))
    #     Audience.objects.bulk_create(audience)
    #     return Response({
    #         "message": "Audience created Successfully.",
    #     }, 201)

    def create(self, request):
        user = self.request.user
        emails = request.data["emails"]
        status = request.data["status"]
        tag_titles = request.data["tags"]
        AudienceService.bulk_create(user, emails, status, tag_titles)
        return Response({
            "message": "Audience created Successfully.",
        }, 201)


class AudienceStatsView(views.APIView):
    queryset = Audience.objects.order_by('-id')
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = self.request.user
        queryset = self.queryset.filter(user=user)
        # tags = Tag.objects.all()
        # tags.annotate(Count('tags'))
        tags_count_desc = []
        # for tag in tags:
        #     queryset.filter(tags__id=tag.pk).count()
        audience = queryset.annotate(Count('tags'))
        tags = Tag.objects.all()
        # tags = tags.annotate(tags_count=Count(tags))
        tag_wise_count = {}
        for tag in tags:
            # print(vars(tag))
            tag_wise_count[tag.title] = queryset.filter(tags=tag.pk).count()  # a.tags__count
        tag_wise_count = dict(sorted(tag_wise_count.items(), key=lambda item: item[1], reverse=True))
        data = {
            "total_audience": queryset.count(),
            "tag_wise_count": tag_wise_count
        }
        return Response(data)
