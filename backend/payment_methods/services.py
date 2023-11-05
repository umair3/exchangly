from django.contrib.auth.models import User
from payment_gateways.models import PaymentGateway
from .models import PaymentMethod
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter


class PaymentMethodService:
    def __init__(self, payment_method: PaymentMethod, payment_gateway: AbstractPaymentGatewayOuter):
        self.payment_method = payment_method
        self.payment_gateway = payment_gateway

    def get(self, key):
        pg: PaymentGateway = self.payment_method.payment_gateway
        payment_gateway = AbstractPaymentGatewayOuter.get_payment_gateway(pg.title)

    @staticmethod
    def get_or_create(pg_payment_method_id: str, user: User) -> PaymentMethod:
        try:
            payment_method: PaymentMethod = PaymentMethod.objects.get(pg_payment_method_id=pg_payment_method_id)
        except PaymentMethod.DoesNotExist:
            payment_gateway = PaymentGateway.objects.get(user=user)
            payment_method: PaymentMethod = PaymentMethod(
                user=user,
                payment_gateway=payment_gateway,
                pg_payment_method_id=pg_payment_method_id,
                verified=False,
                active=False
            )
            payment_method.save()
        return payment_method
