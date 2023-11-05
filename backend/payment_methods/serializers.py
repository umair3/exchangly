from rest_framework import serializers
from .models import PaymentMethod
from common.current_user import CurrentUserDefault
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter, Stripe
from payment_gateways.models import PaymentGateway


class PaymentMethodSerializer(serializers.ModelSerializer):
    last_4_digits = serializers.SerializerMethodField('get_last_4_digits')
    user = serializers.HiddenField(default=CurrentUserDefault())

    def get_last_4_digits(self, pm: PaymentMethod):
        stripe = Stripe()
        pg_pm = stripe.payment_method(pm.pg_payment_method_id)
        return pg_pm.card.last4

    class Meta:
        model = PaymentMethod
        # fields = '__all__'
        fields = ['id', 'created', 'updated', 'user', 'payment_gateway', 'pg_payment_method_id', 'verified', 'active',
                  'last_4_digits']
        # user = serializers.HiddenField(default=CurrentUserDefault())
        extra_kwargs = {
            'created': {'read_only': True},
            'updated': {'read_only': True},
            'user': {'read_only': True},
            'payment_gateway': {'read_only': True},
            'pg_payment_method_id': {'read_only': True},
            'verified': {'read_only': True},
            'active': {'read_only': True}
        }

    # email = serializers.EmailField(required=True)
    # user = serializers.HiddenField(default=CurrentUserDefault())
