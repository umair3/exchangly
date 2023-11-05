from datetime import date, datetime
from django.contrib.auth.models import User
from django.db.models import Q
from charge_options.models import ChargeOption
from mmbe.settings import TEST_KEY
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from payments.services import PaymentService
from outers.customer import Customer
from outers.payment_gateway_outer import AbstractPaymentGatewayOuter
from .exceptions import CannotCancelPendingSubscriptionException, SubscriptionAlreadyCancelledException, \
    SubscriptionNotExpiredException
from .models import Subscription
from .serializers import SubscriptionSerializer, SubscriptionExtensionSerializer, SubscriptionCancelSerializer
from .services import SubscriptionService
import time


class SubscriptionCancelViewSet(generics.GenericAPIView):
    serializer_class = SubscriptionCancelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        print(f"SubscriptionCancelViewSet.put({request.data})")
        user: User = self.request.user
        subscription_id = self.request.data.get('subscription_id')
        try:
            subscription: Subscription = Subscription.objects.get(user=user.pk, id=subscription_id)
            if subscription is not None:
                subscription_service: SubscriptionService = SubscriptionService(subscription)
                if subscription_service.cancel_subscription():
                    return Response({
                        "message": "Subscription cancelled successfully."
                    }, 200)
            raise subscription.DoesNotExist
        except Subscription.DoesNotExist:
            return Response({
                "message": "Subscription does not exist."
            }, 400)
        except CannotCancelPendingSubscriptionException:
            return Response({
                "message": "Cannot cancel pending subscription."
            }, 400)
        except SubscriptionAlreadyCancelledException:
            return Response({
                "message": "Subscription is already cancelled."
            }, 400)


class SubscriptionExtensionRecurringViewSet(generics.GenericAPIView):
    serializer_class = SubscriptionExtensionSerializer

    def get(self, request):
        today = date.today()
        day_start = datetime.combine(today, datetime.min.time())
        print(f"day_start: {day_start}")
        day_end = datetime.combine(today, datetime.max.time())
        print(f"day_end: {day_end}")
        SubscriptionService.extend_during(day_start, day_end)
        # subscriptions = Subscription.objects.all()
        # # subscriptions = subscriptions.filter(status='ACTIVE')
        # subscriptions.filter(Q(status='TRIAL') | Q(status='ACTIVE'))
        # subscriptions = subscriptions.filter(expiry__gt=day_start)
        # subscriptions = subscriptions.filter(expiry__lt=day_end)
        # print(f"subscriptions.query: {subscriptions.query}")
        # print(f"subscriptions: {subscriptions}")
        # s: Subscription
        # for s in subscriptions:
        #     print(f"s: {s}")
        #     print(f"s.id: {s.id}")
        #     charge_option: ChargeOption = ChargeOption.objects.get(id=s.charge_option_id)
        #     payment_gateway: AbstractPaymentGatewayOuter = AbstractPaymentGatewayOuter.get_payment_gateway(s.payment_gateway)
        #     payment = PaymentService.create_recurring_payment_intent(payment_gateway, Customer(s.user), s, charge_option)
        #     time.sleep(2)

        return Response({
            "message": "Recurring subscription job started."
        }, 200)


# {
#     "expiry_time": "2022-10-21 09:15:32",
#     "user_id": "1",
#     "secret_test_key": "SecretKey123"
# }


class SubscriptionExpiryViewSet(generics.GenericAPIView):
    serializer_class = SubscriptionExtensionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print(f"SubscriptionExtensionViewSet.post({request.data})")
        expire_time = self.request.data.get('expiry_time')
        user_id = self.request.data.get('user_id')
        secret_test_key = self.request.data.get('secret_test_key')
        if secret_test_key != TEST_KEY:
            return Response({
                "message": "Secret test key does not exist."
            }, 401)
        try:
            subscription = Subscription.objects.get(user=user_id)
            subscription.expiry = expire_time
            subscription.save()
            return Response({
                "message": "Subscription expiry time updated successfully."
            }, 200)
        except:
            pass
        else:
            return Response({
                "message": "Subscription expiry time update request failed."
            }, 400)


class SubscriptionExtensionViewSet(generics.GenericAPIView):
    serializer_class = SubscriptionExtensionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print(f"SubscriptionExtensionViewSet.post({request.data})")
        expire_time = self.request.data.get('expiry_time')
        user_id = self.request.data.get('user_id')
        secret_test_key = self.request.data.get('secret_test_key')
        if secret_test_key != TEST_KEY:
            return Response({
                "message": "Secret test key does not exist."
            }, 401)
        try:
            SubscriptionService.extend_all(expire_time)
            return Response({
                "message": "Expiry time extension request created with successful payment request."
            }, 200)
        except SubscriptionNotExpiredException:
            return Response({
                "message": "Expiry time extension request failed."
            }, 400)


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all().order_by('-updated')
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        user: User = self.request.user
        print(f"user: {user}")
        queryset = queryset.filter(user=user.pk)
        plan_id = self.request.query_params.get('plan', None)
        if plan_id:
            queryset = queryset.filter(plan_id=plan_id)
        return queryset

    # def partial_update(self, request, *args, **kwargs):
    #     super().partial_update(request, *args, **kwargs)
    #     queryset = self.queryset
    #     user_id = self.request.query_params.get('userId')
    #     if user_id:
    #         subscription = queryset.filter(userId=user_id)
    #         serializer = self.serializer_class(subscription, data=request.data, partial=True)
    #         serializer.save()
    #         return Response(serializer.data)

    # @action(detail=False, methods=['get'], url_path='trial')
    # def qualifies_for_trial(self, request, *args, **kwargs):
    #     user_id = self.request.query_params.get('userId', None)
    #     subscription = Subscription.objects.get(userId=user_id)
    #     if subscription.trialStatus is None:
    #         custom_response = {"message": "AVAILABLE"}
    #         return Response(custom_response, status=status.HTTP_200_OK)
    #     return Response(False)

    # def extend_subscriptions(self):
    #     queryset = self.queryset
    #     active_subscriptions = queryset.filter(status='ACTIVE')
    #     for s in queryset:
    #         s:Subscription = s
    #         if s.expiry == datetime.date
