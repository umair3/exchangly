from rest_framework import serializers
from .models import Activity, ActivityDetail


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        # fields = '__all__'
        # fields = ['id', 'title']
        exclude = ('user',)

    # def create(self, validated_data):
    #     # profile_data = validated_data.pop('profile')
    #     campaign = Campaign.objects.create(**validated_data)
    #     # Profile.objects.create(user=user, **profile_data)
    #     return campaign


class ActivityDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityDetail
        # fields = '__all__'
        # fields = ['id', 'campaign', 'audience']
        exclude = ('user',)
        # extra_kwargs = {
        #     'current_executions': {'read_only': True},
        # }
