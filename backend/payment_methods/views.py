import rest_framework.request
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from payment_gateways.models import PaymentGateway
from rest_framework import permissions, viewsets, status
from rest_framework.renderers import JSONRenderer
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter, PaymentIntent
from payments.models import Payment
from payments.services import PaymentService
from .models import PaymentMethod
from .serializers import PaymentMethodSerializer


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(f"PaymentMethodViewSet.get_queryset({self})")
        user = self.request.user
        print(f"user: {user}")
        queryset = self.queryset.filter(user=user)
        return queryset

    def create(self, request: rest_framework.request.Request, *args, **kwargs):
        print(f"PaymentMethodViewSet.create({self}, {request}, {args}, {kwargs})")
        # serializer: PaymentMethodSerializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        user = self.request.user
        payment_gateway = 'stripe'
        currency = 'USD'
        pg_model: PaymentGateway = PaymentGateway.objects.get(user=user.pk, title=payment_gateway)
        intent: PaymentIntent = PaymentService.verify_card(pg_model.customer_id, currency)
        payment = Payment()
        payment.currency = currency
        payment.amount = 1
        payment.paymentGateway = payment_gateway
        payment.paymentGatewayClientSecret = intent.client_secret
        # payment.authorization_url = intent.authorization_url
        payment.paymentGatewayCustomerId = pg_model.customer_id
        payment.paymentIntentId = intent.id
        payment.userId = user.pk
        payment.save()
        return Response({
            "clientSecret": intent.client_secret,
            # "authorization_url": intent.authorization_url
        }, 201)

    # def create(self, request: rest_framework.request.Request, *args, **kwargs):
    #     print(f"PaymentMethodViewSet.create({self}, {request}, {args}, {kwargs})")
    #     user = self.request.user
    #     print(f"user: {user}")
    #     print(f"request.data: {request.data}")
    #     payment_gateway_model = PaymentGateway.objects.get(pk=request.data['payment_gateway'])
    #     payment_method_model = PaymentMethod()
    #     payment_method_model.user = user
    #     payment_method_model.payment_gateway = payment_gateway_model
    #     payment_method_model.verified = False
    #     payment_method_model.active = False
    #     payment_method_serializer = PaymentMethodSerializer(payment_method_model, data=request.data)
    #     if payment_method_serializer.is_valid(raise_exception=True):
    #         payment_method_serializer.save()
    #         return JSONRenderer().render(payment_method_serializer.data)
    #     return False



    # def update(self, request, *args, **kwargs):
    #     ...
