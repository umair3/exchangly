from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter
from payment_gateways.models import PaymentGateway
from payment_gateways.services import PaymentGatewayService


class PaymentGatewayServiceStripeTestCase(TestCase):

    def setUp(self) -> None:
        settings.DEBUG = True
        user = User()
        user.email = "test@test.test"
        user.first_name = "Test"
        user.last_name = "User"
        user.save()

    def test_get_or_create(self):
        user = User.objects.get(email='test@test.test')
        payment_gateway = PaymentGatewayService.get_or_create(
            pg_key='stripe',
            pg_outer_class=AbstractPaymentGatewayOuter,
            pg_class=PaymentGateway,
            user=user
        )
        print(f"payment_gateway: {payment_gateway.customer_id}")
        customer_id = str(payment_gateway.customer_id)
        first_4_chars = customer_id[0:4]
        print(f"first_4_chars: {first_4_chars}")
        self.assertEqual('cus_', first_4_chars)


# class PaymentGatewayServicePayStackTestCase(TestCase):
#
#     def setUp(self) -> None:
#         settings.DEBUG = True
#         user = User()
#         user.email = "test@test.test"
#         user.first_name = "Test"
#         user.last_name = "User"
#         user.save()
#
#     def test_get_or_create(self):
#         user = User.objects.get(email='test@test.test')
#         payment_gateway = PaymentGatewayService.get_or_create(
#             pg_key='paystack',
#             pg_outer_class=AbstractPaymentGatewayOuter,
#             pg_class=PaymentGateway,
#             user=user
#         )
#         print(f"payment_gateway: {payment_gateway.customer_id}")
#         customer_id = str(payment_gateway.customer_id)
#         first_4_chars = customer_id[0:4]
#         print(f"first_4_chars: {first_4_chars}")
#         self.assertEqual('cus_', first_4_chars)
