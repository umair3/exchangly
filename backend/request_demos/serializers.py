from rest_framework import serializers
from .models import RequestDemo

class RequestDemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestDemo
        fields = '__all__'

    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    email = serializers.CharField(required=True, allow_blank=False, max_length=100)

    
