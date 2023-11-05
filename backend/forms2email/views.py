from django.shortcuts import redirect
from django.http import HttpResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions, views
from rest_framework.response import Response

from .models import EmailForm
from django.contrib.auth.models import User
from .serializers import Forms2EmailSerializer
from dispatcher.services import DispatcherService
from dispatcher.emailService import EmailService
from email_templates.models import UserEmailTemplate


class Forms2EmailViewSet(viewsets.ModelViewSet):
    queryset = EmailForm.objects.all()
    serializer_class = Forms2EmailSerializer
    # permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        user: User = self.request.user
        print(f"user: {user}")
        return self.queryset.filter(user=user.pk)
        # subscriptions = Subscription.objects.get(user=user.pk)
        # return subscriptions
        # return Response(SubscriptionSerializer(subscriptions).data)

    # def create(self, request, *args, **kwargs):
    #
    #     return


# @csrf_exempt
# class SubmitFormAPI(views.APIView):
#     @csrf_exempt
#     def post(self, request, *args, **kwargs):
#         print(f"submitFormAPI.post({request}, {args}, {kwargs})")
#         uuid = "ecddf774-6a9c-4248-81ce-08e768b24dd3"
#         headers = {
#             'Access-Control-Allow-Origin': '*'
#         }
#         return Response(status=200, headers=headers)


@csrf_exempt
def SubmitFormAPI(request: HttpRequest):
    uuid = "ecddf774-6a9c-4248-81ce-08e768b24dd3"
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    print(f"Request: {request}")
    print(f"Request.body: {request.body}")
    print(f"Request POST: {request.POST}")
    if request.POST.get("_uuid") != uuid:  # match referrer here too, one referrer for one uuid.
        return HttpResponse(status=403, headers=headers, content="Forbidden")
    user = User.objects.get(pk=1)
    params = {}
    for key in request.POST:
        params["{{"+key+"}}"] = request.POST[key]
    reply_to = request.POST.get("_replyto")
    subject = request.POST.get("_subject")
    after = request.POST.get("_after")
    honeypot = request.POST.get("_honeypot")
    confirmation = request.POST.get("_confirmation")
    template = request.POST.get("_template")
    # get receiver email id from template
    dispatcher = DispatcherService(
        account=user,
        email_outer=EmailService(),
        to=["info@canalmall.com.pk"],
        subject=subject,
        data=""
    )
    user_template = UserEmailTemplate.objects.get(pk=template)
    dispatcher.prepare_email(user_template, params)
    print(f"after: {after}")
    return redirect(to=after, permanent=False)
    # print(a)
    # pass all parameters to
    # request.POST.get("title", "")
    # return HttpResponse(status=200, headers=headers, content="form submitted")
