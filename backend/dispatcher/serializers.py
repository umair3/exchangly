from rest_framework import serializers
from .models import Dispatcher


class DispatcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispatcher
        fields = ['id', 'created', 'updated', 'sender', 'receiver', 'subject', 'body', 'paramsJSON']
