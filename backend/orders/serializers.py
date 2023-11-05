from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    email = serializers.EmailField(required=True, allow_blank=False, max_length=100)
    promo = serializers.CharField(required=True, allow_blank=False, max_length=100)
