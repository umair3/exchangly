from django.contrib.auth.models import User
from payments.services import PaymentService
from .models import PaymentGateway
from outers.customer import Customer
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter


class PaymentGatewayService:

    @staticmethod
    def get_or_create(
            pg_key: str,
            pg_outer_class: AbstractPaymentGatewayOuter,
            pg_class: PaymentGateway,
            user: User,
    ) -> PaymentGateway:
        try:
            payment_gateway: PaymentGateway = pg_class.objects.get(user=user)
        except PaymentGateway.DoesNotExist:
            pg_outer = pg_outer_class.get_payment_gateway(pg_key)
            pg_customer = pg_outer.create_customer(
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                description=''
            )
            payment_gateway: PaymentGateway = pg_class(
                user=user,
                title=pg_key,
                customer_id=pg_customer['id']
            )
            payment_gateway.save()
        return payment_gateway
