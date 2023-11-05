from rest_framework import serializers
from .models import Campaign, CampaignAudience, CampaignExecution, CampaignExecutionLog, CampaignJob
from common.current_user import CurrentUserDefault


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'
        # fields = ['id', 'title']
    user = serializers.HiddenField(default=CurrentUserDefault())

    # def create(self, validated_data):
    #     # profile_data = validated_data.pop('profile')
    #     campaign = Campaign.objects.create(**validated_data)
    #     # Profile.objects.create(user=user, **profile_data)
    #     return campaign


class CampaignAudienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignAudience
        fields = '__all__'
        # fields = ['id', 'campaign', 'audience']
        # exclude = ('user',)
    user = serializers.HiddenField(default=CurrentUserDefault())


class CampaignExecutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignExecution
        fields = '__all__'
        # fields = ['id', 'campaign', 'status']
        # exclude = ('user',)
    user = serializers.HiddenField(default=CurrentUserDefault())

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['campaign'] = CampaignSerializer(instance.campaign).data
        return response


class CampaignExecutionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignExecutionLog
        fields = '__all__'
        # fields = ['id', 'campaign_execution', 'email', 'status']
        # exclude = ('user',)
    user = serializers.HiddenField(default=CurrentUserDefault())


class CampaignJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignJob
        fields = '__all__'
        # fields = ['id', 'campaign_execution', 'email', 'status']
        # exclude = ('user',)
        extra_kwargs = {
            'current_executions': {'read_only': True},
        }
    user = serializers.HiddenField(default=CurrentUserDefault())
