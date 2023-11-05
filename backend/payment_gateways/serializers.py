from rest_framework import serializers
from .models import PaymentGateway
from common.current_user import CurrentUserDefault


class PaymentGatewaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentGateway
        fields = '__all__'
        # fields = ['id', 'created', 'updated', 'title']

    # email = serializers.EmailField(required=True)
    # user = serializers.HiddenField(default=CurrentUserDefault())
