from django.contrib.auth.models import User
from email_templates.models import UserEmailTemplate
from mmbe.settings import EMAIL
from outers.email_outer import AbstractEmailOuter
from .models import Dispatcher


class DispatcherService:

    def __init__(self, account: User, email_outer: AbstractEmailOuter, to: [str], subject: str, data: str):
        self.account = account
        self.email_outer = email_outer
        self.to = to
        self.subject = subject
        self.data = data

    def prepare_email(self, user_template: UserEmailTemplate, params: dict):
        body = user_template.body
        for key in params:
            value = str(params[key])
            print("Key: " + key)
            print("Value: " + value)
            body = body.replace(key, value)
        self.data = body
        return self

    def dispatch(self):
        self.email_outer.send(receiver=self.to, subject=self.subject, data=self.data)
        dispatcher: Dispatcher = Dispatcher()
        dispatcher.sender = EMAIL['SENDER']
        dispatcher.receiver = self.to
        dispatcher.subject = self.subject
        dispatcher.body = self.data
        dispatcher.paramsJSON = '{}'
        dispatcher.account = self.account
        dispatcher.save()
