from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from payment_gateways.models import PaymentGateway
from .services import PaymentMethodService


class PaymentMethodServiceStripeTestCase(TestCase):

    def setUp(self) -> None:
        settings.DEBUG = True
        user = User()
        user.email = "test@test.test"
        user.first_name = "Test"
        user.last_name = "User"
        user.save()
        payment_gateway = PaymentGateway()
        payment_gateway.customer_id = 'cus_test_id'
        payment_gateway.user = user
        payment_gateway.title = 'stripe'
        payment_gateway.save()

    def test_get_or_create(self):
        user = User.objects.get(email='test@test.test')
        pg_payment_method_id = 'test_method_id'
        payment_method = PaymentMethodService.get_or_create(
            pg_payment_method_id=pg_payment_method_id,
            user=user
        )
        self.assertEqual(pg_payment_method_id, payment_method.pg_payment_method_id)


