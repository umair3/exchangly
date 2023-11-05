from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'


class SubscriptionExtension:
    def __init__(self, expiry_time, message):
        self.expiry_time = expiry_time
        self.message = message


class SubscriptionExtensionSerializer(serializers.Serializer):
    expiry_time = serializers.DateTimeField(write_only=True)
    user_id = serializers.IntegerField(write_only=True)
    secret_test_key = serializers.CharField(write_only=True)
    message = serializers.CharField(read_only=True)

    def create(self, validated_data):
        return SubscriptionExtension(**validated_data)

    def update(self, instance, validated_data):
        # instance.email = validated_data.get('email', instance.email)
        # instance.content = validated_data.get('content', instance.content)
        # instance.created = validated_data.get('created', instance.created)
        return instance


class SubscriptionCancelSerializer(serializers.Serializer):
    subscription_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        return SubscriptionExtension(**validated_data)

    def update(self, instance, validated_data):
        # instance.email = validated_data.get('email', instance.email)
        # instance.content = validated_data.get('content', instance.content)
        # instance.created = validated_data.get('created', instance.created)
        return instance
