from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import OrderSerializer
from charge_options.models import ChargeOption
from coupons.utils import is_coupon_valid
from coupons.models import Coupon
from subscriptions.utils import active_subscription, remove_pending_subscriptions
from orders.utils import clean_slate, has_same_currency
from orders.models import OrderItem
from .services import OrderService
from django.contrib.auth.models import User


class OrderViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    # def list(self, request):
    #     queryset = Order.objects.all()
    #     serializer = OrderSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # serializer = self.get_serializer(data=request.data)
    # print(type(serializer))
    # serializer.is_valid(raise_exception=True)
    # user = serializer.create(serializer.validated_data)
    #
    # return Response({
    #     "user": UserSerializer(
    #         user,
    #         context=self.get_serializer_context()
    #     ).data,
    #     "message": "User Created Successfully.  Now perform Login to get your token",
    # }, 201)
    # {
    #     "promoCode": "",
    #     "skipTrial": "1",
    #     "items": [
    #         {
    #             "productId": 1,
    #             "qty": 1
    #         }
    #     ]
    # }
    @csrf_exempt
    def create(self, request):
        print(f"OrderViewSet.create({request.data})")
        # user_id = self.request.query_params.get("userId")
        user: User = self.request.user
        email = user.email
        items = request.data["items"]
        coupon_code = request.data["promoCode"]
        skip_trial = request.data["skipTrial"]
        if active_subscription(user.id, items):
            return Response({
                "message": "An active subscription already exists for this user.",
                "code": "SUBSCRIPTION_ALREADY_EXISTS"
            }, 400)
        if has_same_currency(items) is False:
            return Response({
                "message": "An order cannot have items with different currencies.",
                "code": "MULTIPLE_CURRENCIES_ISSUE"
            }, 400)
        remove_pending_subscriptions(user.id)
        if coupon_code:
            if is_coupon_valid(coupon_code) is False:
                return Response({
                    "message": "Coupon code is not correct.",
                    "code": "INVALID_COUPON"
                }, 400)
        clean_slate(email)
        currency = 'USD'
        for item in items:
            charge_option = ChargeOption.objects.get(pk=item["productId"])
            currency = charge_option.currency
        order = OrderService.create_order(email, user.id, currency)
        try:
            OrderService.add_order_items(order, items, skip_trial)
        except ChargeOption.DoesNotExist:
            return Response({
                "message": f"Charge option for the product Id does not exist.",
                "code": "INVALID_CHARGE_OPTION"
            }, 400)
        # finally:
        #     return Response({
        #         "message": f"Order items are not correct.",
        #     }, 400)
        OrderService.update_order_with_totals(order)
        if coupon_code:
            try:
                coupon = Coupon.objects.get(code=coupon_code)
                if skip_trial:
                    OrderService.apply_coupon(order, coupon)
                else:
                    OrderService.apply_coupon_with_trial(order, coupon)
            except Coupon.DoesNotExist:
                return Response({
                    "message": "Coupon code does not exist.",
                    "code": "INVALID_COUPON"
                }, 400)
            except OrderItem.DoesNotExist:
                return Response({
                    "message": "Order item does not exist.",
                    "code": "INVALID_PRODUCT"
                }, 400)
        # mark_coupon_pending(order.promoCode)
        return Response({
            "order": OrderSerializer(order).data,
            "message": "Order Created Successfully.",
        }, 201)

    @staticmethod
    def calculate_order():
        pass
