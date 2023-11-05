from coupons.exceptions import InvalidCouponException
from coupons.models import Coupon
from coupons.utils import is_coupon_valid
from django.contrib.auth.models import User
from orders.exceptions import NotIncompleteOrderException
from orders.models import Order, OrderItem
from orders.services import OrderService
from payment_gateways.models import PaymentGateway
from payment_gateways.services import PaymentGatewayService
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from outers.customer import Customer
from outers.payment_gateway_outer import PaymentGatewayChargeException
from subscriptions.models import Subscription
from .exceptions import PaymentGatewayDoesNotExistException
from .models import Payment
from .serializers import PaymentSerializer
from .services import AbstractPaymentGatewayOuter, PaymentService


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-updated')
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user: User = self.request.user
        queryset = self.queryset.filter(userId=user.pk)
        return queryset

    def create(self, request, *args, **kwargs):
        print(request.data)
        order_id = request.data["order"]
        order = Order.objects.get(pk=order_id)
        user: User = self.request.user
        user_id = user.id
        pg_key = request.data["paymentGateway"]
        # get or create payment gateway customer.
        payment_gateway = PaymentGatewayService.get_or_create(
            pg_key=pg_key,
            pg_outer_class=AbstractPaymentGatewayOuter,
            pg_class=PaymentGateway,
            user=user
        )
        # cancel any previous pending payment intents.
        try:
            orders = Order.objects.filter(user=user_id)
            PaymentService.cancel_payment_intents_by_orders(orders)
            order = OrderService.get_incomplete_order(order_id)
            customer = Customer(user)
            order_items = OrderItem.objects.filter(order=order_id, )
            # cancel payment intents having this coupon code
            coupon = None
            if order.promo:
                if is_coupon_valid(order.promo) is False:
                    raise InvalidCouponException
                coupon = Coupon.objects.get(code=order.promo)
                PaymentService.cancel_payment_intents_by_coupon(coupon)
            for order_item in order_items:
                # get subscription or create previous subscription.
                # try:
                #     subscription = Subscription.objects.get(userId=user_id)
                #     print("subscription exits for userId:"+str(user_id))
                # except Subscription.DoesNotExist:
                #     print("subscription does not exists")
                #     subscription = Subscription()
                subscription: Subscription = Subscription()
                subscription.create_pending(user_id, order, order_item, payment_gateway.customer_id)
                if coupon:
                    subscription.coupon = coupon  # Coupon code should be added with only matching ChargeOption
                subscription.save()
        except Order.DoesNotExist:
            return Response({
                "message": f"Order does not exist.",
                "code": "INVALID_ORDER"
            }, 400)
        except NotIncompleteOrderException:
            return Response({
                "message": f"No incomplete order found.",
                "code": "INVALID_ORDER"
            }, 400)
        except PaymentGatewayDoesNotExistException:
            return Response({
                "message": f"Payment gateway is invalid.",
                "code": "INVALID_PAYMENT_GATEWAY"
            }, 400)
        except PaymentGatewayChargeException as e:
            # Paystack does not return a specific error, so returning generic error.
            return Response({
                "message": f"{e}",
                "code": "PAYMENT_GATEWAY_CHARGE_EXCEPTION"
            }, 400)
        except InvalidCouponException or Coupon.DoesNotExist:
            return Response({
                "message": "Coupon code is not correct.",
                "code": "INVALID_COUPON"
            }, 400)
        if int(order.total) < 1:
            intent = PaymentService.verify_card(payment_gateway.customer_id, order.currency)
        else:
            amount = int(order.total * 100)
            print("amount: " + str(amount))
            intent = PaymentService.charge(
                customer,
                payment_gateway.customer_id,
                amount,
                order.currency,
                AbstractPaymentGatewayOuter.get_payment_gateway(pg_key)
            )
        payment = PaymentService.create_payment(pg_key, intent, payment_gateway.customer_id, order)
        return Response({
            "clientSecret": payment.paymentGatewayClientSecret,
            "authorization_url": payment.authorization_url
        }, 201)
