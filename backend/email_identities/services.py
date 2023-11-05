from django.contrib.auth.models import User

from accounts.services import AccountService
from codes.models import Code
from dispatcher.services import DispatcherService
from email_templates.models import UserEmailTemplate
from mmbe.settings import URL_VERIFY, EMAIL
from outers.email_outer import AbstractEmailOuter


class EmailIdentityService:

    def __init__(self, user: User, email: str) -> None:
        self.user = user
        self.email = email

    def send_verification_email(self):
        email_outer: AbstractEmailOuter = AbstractEmailOuter.get_mail_service(key=EMAIL['NAME'])
        params = {
            "PARAM_VERIFY_LINK": AccountService(user=self.user).create_verification_url(Code(), "", URL_VERIFY),
        }
        template: UserEmailTemplate = UserEmailTemplate.objects.get(pk=5)
        DispatcherService(
            account=self.user,
            email_outer=email_outer,
            to=self.email,
            subject=template.subject,
            data=""
        ).prepare_email(template, params).dispatch()

