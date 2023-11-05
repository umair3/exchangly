from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Campaign, CampaignTag, CampaignExecution, CampaignExecutionLog, CampaignJob
from .serializers import CampaignSerializer, CampaignAudienceSerializer, CampaignExecutionSerializer, \
    CampaignExecutionLogSerializer, CampaignJobSerializer
import copy


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Campaign.objects.filter(user=user)
        return queryset

    # def create(self, request, *args, **kwargs):
    #     data = {
    #         'user': self.request.user,
    #         'title': request.data["title"]
    #     }
    #     serializer = CampaignSerializer(data=data)
    #     # serializer.validate()
    #     # serializer.create(serializer.validate())
    #     serializer.is_valid(raise_exception=True)
    #     campaign: Campaign = serializer.create(validated_data=data)
    #     # serializer.errors
    #     # {'email': ['Enter a valid e-mail address.'], 'created': ['This field is required.']}
    #     # Return a 400 response if the data was invalid.
    #     # serializer.is_valid(raise_exception=True)
    #     return Response(CampaignSerializer(campaign).data, 200)


class CampaignTagViewSet(viewsets.ModelViewSet):
    queryset = CampaignTag.objects.all()
    serializer_class = CampaignAudienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = CampaignTag.objects.filter(user=user)
        return queryset

    # def create(self, request, *args, **kwargs):
    #     data = {
    #         'user': self.request.user,
    #         'campaign': request.data["campaign"],
    #         'audience': request.data["audience"]
    #     }
    #     serializer = CampaignAudienceSerializer(data=data)
    #     # serializer.validate()
    #     # serializer.create(serializer.validate())
    #     serializer.is_valid(raise_exception=True)
    #     # campaign_audience: CampaignAudience = serializer.create(validated_data=data)
    #     campaign_audience: CampaignAudience = CampaignAudience()
    #     campaign_audience.user = self.request.user
    #     campaign_audience.campaign = Campaign.objects.get(pk=request.data["campaign"])
    #     campaign_audience.audience = Audience.objects.get(pk=request.data["audience"])
    #     campaign_audience.save()
    #     # serializer.errors
    #     # {'email': ['Enter a valid e-mail address.'], 'created': ['This field is required.']}
    #     # Return a 400 response if the data was invalid.
    #     # serializer.is_valid(raise_exception=True)
    #     return Response(CampaignAudienceSerializer(campaign_audience).data, 200)


class CampaignExecutionViewSet(viewsets.ModelViewSet):
    queryset = CampaignExecution.objects.all()
    serializer_class = CampaignExecutionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = CampaignExecution.objects.filter(user=user)
        campaign_id = self.request.query_params.get('campaignId', None)
        if campaign_id is not None:
            queryset = queryset.filter(campaign__id=campaign_id)
        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset

    def create(self, request, *args, **kwargs):
        print(f"CampaignExecutionViewSet.create({self}, {request}, {args}, {kwargs})")
        data = copy.deepcopy(request.data)
        data['status'] = 'STARTED'
        serializer = CampaignExecutionSerializer(context={'request': request}, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CampaignExecutionLogViewSet(viewsets.ModelViewSet):
    queryset = CampaignExecutionLog.objects.all()
    serializer_class = CampaignExecutionLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = CampaignExecutionLog.objects.filter(user=user)
        campaign_execution_id = self.request.query_params.get('campaignExecutionId', None)
        if campaign_execution_id is not None:
            queryset = queryset.filter(campaign_execution__id=campaign_execution_id)
        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset

    # def create(self, request, *args, **kwargs):
    #     data = {
    #         'user': self.request.user,
    #         'campaign_execution': request.data["campaign_execution"],
    #         'email': request.data["email"],
    #         'status': 'QUEUED'
    #     }
    #     serializer = CampaignExecutionLogSerializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     campaign_execution_log: CampaignExecutionLog = CampaignExecutionLog()
    #     campaign_execution_log.user = self.request.user
    #     campaign_execution_log.campaign_execution = CampaignExecution.objects.get(pk=request.data["campaign_execution"])
    #     campaign_execution_log.email = request.data["email"]
    #     campaign_execution_log.status = 'QUEUED'
    #     campaign_execution_log.save()
    #     return Response(CampaignExecutionLogSerializer(campaign_execution_log).data, 200)


class CampaignJobViewSet(viewsets.ModelViewSet):
    """
    CampaingJob module is similar to CronJob with an extra feature of max_executions.
    Here are some pre-defined settings.
    @yearly Run once a year, "0 0 1 1 *".
    @annually (same as @yearly)
    @monthly Run once a month, "0 0 1  ".
    @weekly Run once a week, "0 0   0".
    @daily Run once a day, "0 0   *".
    @midnight (same as @daily)
    @hourly Run once an hour, "0    ".
    max_executions = 0 means unlimited executions
    """
    queryset = CampaignJob.objects.all()
    serializer_class = CampaignJobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = CampaignJob.objects.filter(user=user)
        return queryset

    # def create(self, request, *args, **kwargs):
    #     data = {
    #         'user': self.request.user,
    #         'campaign': request.data["campaign"],
    #         'minute': request.data["minute"],
    #         'hour': request.data["hour"],
    #         'day_of_month': request.data["day_of_month"],
    #         'month': request.data["month"],
    #         'day_of_week': request.data["day_of_week"],
    #         'max_executions': request.data["max_executions"],
    #     }
    #     serializer = CampaignJobSerializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     campaign_job: CampaignJob = CampaignJob()
    #     campaign_job.user = self.request.user
    #     campaign_job.campaign = Campaign.objects.get(pk=request.data["campaign"])
    #     campaign_job.minute = request.data["minute"]
    #     campaign_job.hour = request.data["hour"]
    #     campaign_job.day_of_month = request.data["day_of_month"]
    #     campaign_job.month = request.data["month"]
    #     campaign_job.day_of_week = request.data["day_of_week"]
    #     campaign_job.max_executions = request.data["max_executions"]
    #     campaign_job.save()
    #     return Response(CampaignJobSerializer(campaign_job).data, 200)
