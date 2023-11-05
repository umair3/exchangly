# import json
# import requests
# from dispatcher.services import DispatcherService
# from dispatcher.emailService import EmailService
# from email_templates.models import EmailTemplate, UserEmailTemplate
# from pricing_plans.models import PricingPlan
# from outers.customer import Customer
import smtplib

import boto3
import os
from abc import ABC, abstractmethod
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from mmbe.settings import EMAIL


class MailServiceDoesNotExistException(Exception):
    pass


class AbstractEmailOuter(ABC):
    @abstractmethod
    def send(self, receiver, subject, data):
        pass

    @classmethod
    def get_mail_service(cls, key: str):
        if key == "ses":
            return SimpleEmailService()
        elif key == "sendgrid":
            return SendGrid()
        elif key == "smtp":
            return Smtp()
        else:
            raise MailServiceDoesNotExistException

    @abstractmethod
    def verify_domain_dkim(self, domain):
        pass

    @abstractmethod
    def verify_domain_identity(self, domain_name):
        pass

    @abstractmethod
    def verify_email_identity(self, email_address):
        pass


# class EmailOuter:
#
#     @staticmethod
#     def subscription_plan_activated(customer: Customer, pricing_plan: PricingPlan):
#         print(f"Email.subscription_plan_activated({customer}, {pricing_plan})")
#         params = {
#             "PARAM_FIRST_NAME": customer.first_name,
#             "PARAM_LAST_NAME": customer.last_name,
#             "PARAM_SUBSCRIPTION_PLAN_TITLE": pricing_plan.title
#         }
#         data = {
#             "sender": "no-reply@exchangly.com",
#             "receiver": customer.email,
#             "paramsJSON": {
#                 json.dumps(params)
#             }
#         }
#         # EMAIL_SERVICE
#         # url = 'dispatcher/?templateId=5'
#         # response = requests.post(url=url, data=data)
#         # print(response.status_code)
#         # print(response.text)
#         subject = "Subscription plan activated"
#         dispatcher = DispatcherService(
#             email_outer=EmailService(),
#             to=data.get('receiver'),
#             subject=subject,
#             data=""
#         )
#         template = EmailTemplate.objects.get(pk=1)
#         dispatcher.prepare_email(template, params)
#
#     def smtp(self, sender, receivers, message):
#         import smtplib, ssl
#         port = 465  # For SSL
#         password = "BFiZAth6Z8GKBO1d95M89HTLgJR7ghri3pvEOTYrwDrc"
#         context = ssl.create_default_context()
#         with smtplib.SMTP_SSL("email-smtp.ap-southeast-1.amazonaws.com", port, context=context) as server:
#             server.login("AKIAVXPDZH75BNGKSPEM", password)
#             # sender = 'marry.james@exchangly.com'
#             # receivers = ['umair.anwr@gmail.com']
#             # message = """
#             # This is a test e-mail message.
#             # """
#             server.sendmail(sender, receivers, message)


class Smtp(AbstractEmailOuter):

    def send(self, receiver, subject, data):
        server = smtplib.SMTP(host=EMAIL['HOST'], port=EMAIL['PORT'])
        server.set_debuglevel(1)
        print(f"USER: {EMAIL['USER']}")
        print(f"PASS: {EMAIL['PASS']}")
        server.login(user=EMAIL['USER'], password=EMAIL['PASS'])
        server.sendmail(EMAIL['SENDER'], receiver, data)
        server.quit()


class SimpleEmailService(AbstractEmailOuter):

    def __int__(self):
        self.client = boto3.client(
            'ses',
            region_name=EMAIL['AWS_REGION'],
            aws_access_key_id=EMAIL['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=EMAIL['AWS_SECRET_ACCESS_KEY']
        )

    def send(self, receiver, subject, data) -> object:
        client = self.client
        response = client.send_email(
            Destination={
                'BccAddresses': [
                    EMAIL['BCC'],
                ],
                # 'CcAddresses': [
                # ],
                'ToAddresses': [
                    receiver,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': 'UTF-8',
                        'Data': data,
                    },
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': data,
                    },
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': subject,
                },
            },
            # ReplyToAddresses=[
            # ],
            # ReturnPath='',
            # ReturnPathArn='',
            Source=EMAIL['SENDER'],
            # SourceArn='',
        )
        print(response)
        return response

    def verify_domain_dkim(self, domain):
        client = self.client
        response = client.verify_domain_dkim(Domain=domain)

    def verify_domain_identity(self, domain: str) -> str:
        client = self.client
        response = client.verify_domain_identity(Domain=domain)
        return response['VerificationToken']

    def verify_email_identity(self, email_address):
        client = self.client
        response = client.verify_email_identity(EmailAddress=email_address)


class SendGrid(AbstractEmailOuter):
    def send(self, receiver, subject, data):
        message = Mail(
            from_email=EMAIL['SENDER'],
            to_emails=receiver,
            subject=subject,
            html_content=data
        )
        message.add_bcc(bcc_email=EMAIL['BCC'])
        try:
            sg = SendGridAPIClient(api_key=EMAIL['API_KEY'])
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
            return response
        except Exception as e:
            print(f"exception: {e}")

# es = EmailService()
# es.send('umair.anwr@gmail.com', 'my subject', 'my data')

