from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        # fields = '__all__'
        fields = ['id', 'order', 'userId', 'paymentGateway', 'amount', 'currency', 'discount', 'status', 'created', 'updated']

    # amount = serializers.DecimalField(required=True, max_digits=10, decimal_places=2)
    # currency = serializers.CharField(required=True, allow_blank=False, max_length=3)
