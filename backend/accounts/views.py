from business.accounts.managers import AccountManager
from business.accounts.classes import AccountClass
from business.accounts.framework import AccountFramework
from business.services.mailer import Mailer
from codes.models import Code
from codes.services import CodeService
from datetime import datetime
from dispatcher.services import DispatcherService
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.http import HttpRequest
from email_templates.models import UserEmailTemplate
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.serializers import Serializer
from mmbe.settings import EMAIL, URL_LOGIN, URL_VERIFY, URL_RESET_PASS
from outers.email_outer import AbstractEmailOuter
from .serializers import SignupSerializer
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from outers.recaptcha import Recaptcha
from .serializers import AccountSerializer
from .services import AccountService


def signup_view(request: HttpRequest):
    print(f"signup_view({request})")
    msg = ""
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']
        g_recaptcha_response = request.POST['g-recaptcha-response']
        if Recaptcha.verify(g_recaptcha_response):
            account_class = AccountClass(email, password)
            try:
                account = AccountManager().create(account_class, AccountFramework())
                user: User = authenticate(username=email, password=password)
                print(f"account created: {account}")
                email_outer: AbstractEmailOuter = AbstractEmailOuter.get_mail_service(key=EMAIL['NAME'])
                params = {
                    "PARAM_VERIFY_LINK": AccountService(user=user).create_verification_url(Code(), URL_LOGIN, URL_VERIFY),
                }
                template: UserEmailTemplate = UserEmailTemplate.objects.get(pk=1)
                DispatcherService(
                    account=user,
                    email_outer=email_outer,
                    to=user.email,
                    subject=template.subject,
                    data=""
                ).prepare_email(template, params).dispatch()
                messages.success(request,
                                 "Your account with email address " + email + " is ready, we just need email verification before login. Please check your inbox and follow the instructions.")
                return redirect('login')
            except IntegrityError as err:
                print(f"IntegrityError: {err}")
                messages.error(request, "Your account with this email address (" + email + ") already exists.")
            except ValidationError as err:
                print(f"ValidationError: {err}")
                messages.error(request, "Your account with this email address (" + email + ") already exists.")
        else:
            messages.error(request, "Oops, we only serve humans.")
    context = {
        'msg': msg
    }
    return render(request, 'signup.html', context=context)


def verify_view(request: HttpRequest):
    print(f"verify_view({request})")
    msg = ""
    if request.method == "GET":
        if "codeId" in request.GET.keys():
            if CodeService.verify(code_id=int(request.GET["codeId"]), code_value=request.GET["code"]):
                return redirect(URL_LOGIN)
            messages.error(request, "Oops, your verification code is incorrect.")
    elif request.method == "POST":
        email = request.POST['email']
        try:
            user: User = User.objects.get(email=email)
            email_outer: AbstractEmailOuter = AbstractEmailOuter.get_mail_service(key=EMAIL['NAME'])
            params = {
                "PARAM_VERIFY_LINK": AccountService(user=user).create_verification_url(Code(), URL_LOGIN, URL_VERIFY),
            }
            template: UserEmailTemplate = UserEmailTemplate.objects.get(pk=1)
            DispatcherService(
                account=user,
                email_outer=email_outer,
                to=user.email,
                subject=template.subject,
                data=""
            ).prepare_email(template, params).dispatch()
            if user is not None:
                return redirect(URL_LOGIN)
            raise User.DoesNotExist
        except User.DoesNotExist:
            messages.error(request, "Oops, your email is incorrect.")
    context = {}
    return render(request, 'resend-verify-email.html', context=context)


def login_view(request):
    print(f"login_view({request})")
    msg = ""
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']
        g_recaptcha_response = request.POST['g-recaptcha-response']
        if Recaptcha.verify(g_recaptcha_response):
            try:
                user: User = authenticate(username=email, password=password)
                print(f"user authenticated: {user}")
                if user is not None:
                    login(request, user)
                    return redirect('https://app.exchangly.com')
                raise User.DoesNotExist
            except User.DoesNotExist:
                messages.error(request, "Oops, either your email or password is incorrect.")
        else:
            messages.error(request, "Oops, we only serve humans.")
    context = {}
    return render(request, 'login.html', context=context)


def forgot_password_view(request: HttpRequest):
    print(f"forgot_password_view({request})")
    if request.method == "POST":
        email = request.POST['email']
        try:
            user: User = User.objects.get(email=email)
            email_outer: AbstractEmailOuter = AbstractEmailOuter.get_mail_service(key=EMAIL['NAME'])
            params = {
                "PARAM_RESET_PASSWORD_LINK": AccountService(user=user).create_reset_pass_url(Code(), URL_RESET_PASS),
            }
            template: UserEmailTemplate = UserEmailTemplate.objects.get(pk=2)
            DispatcherService(
                account=user,
                email_outer=email_outer,
                to=user.email,
                subject=template.subject,
                data=""
            ).prepare_email(template, params).dispatch()
            messages.success(request, "We have sent you an email message with a password reset link.")
        except User.DoesNotExist:
            messages.error(request, "Oops, your email is incorrect.")
    context = {
        'logged_in': 0
    }
    return render(request, 'forgot-password.html', context=context)


def reset_password_view(request):
    print(f"reset_password_view({request})")
    if request.method == "POST":
        code_id = request.POST['codeId']
        password = request.POST['password']
        try:
            code: Code = Code.objects.get(pk=code_id)
            user: User = code.user
            user.set_password(password)
            user.save()
            messages.success(request, "Your new password has been updated successfully.")
        except User.DoesNotExist:
            messages.error(request, "Oops, your reset password link is not valid.")
    code_id = None
    code = None
    if request.method == "GET":
        code_id = request.GET['codeId']
        code = request.GET['code']
    context = {
        'logged_in': 0,
        'code_id': code_id,
        'code': code
    }
    return render(request, 'reset-password.html', context=context)


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = SignupSerializer
    queryset = User.objects.all()

    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        serializer: Serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account_class = AccountClass(serializer.validated_data['email'], serializer.validated_data['password'])
        # user = authenticate(username='umair.anwr@gmail.com', password='12345678')
        try:
            account = AccountManager().create(account_class, AccountFramework())
            Mailer().send()
            return Response({
                "account": SignupSerializer(
                    account,
                    context=self.get_serializer_context()
                ).data,
                "message": "Account created successfully.",
            }, 201)
        except IntegrityError as err:
            print(f"{err}")
            return Response({
                "message": "Account already exists. ",
            }, 409)

    # def login(self, request, *args, **kwargs):
    #     re
    #     user = authenticate(username='john', password='secret')
    #     if user is not None:
    #
    #     else:
    #         # No backend authenticated the credentials


# class RegisterApi(generics.GenericAPIView):
#     serializer_class = UserSerializer
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         print(type(serializer))
#         serializer.is_valid(raise_exception=True)
#         customer = serializer.create(serializer.validated_data)
#         # Mails.send_verification_email(customer)
#         return Response({
#             "user": UserSerializer(
#                 customer,
#                 context=self.get_serializer_context()
#             ).data,
#             "message": "User Created Successfully.  Now perform Login to get your token",
#         }, 201)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def profile(self, request, *args, **kwargs):
        user = self.request.user
        return Response(AccountSerializer(user).data, 200)

