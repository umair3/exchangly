from dataclasses import dataclass
from mmbe.settings import STRIPE_API_KEY, PAYSTACK_API_KEY
from abc import ABC, abstractmethod
from outers.customer import Customer
import json
import requests
import stripe


class PaymentGatewayDoesNotExistException(Exception):
    pass


class PaymentGatewayChargeException(Exception):
    pass


@dataclass
class PaymentIntent:
    id: str
    client_secret: str
    authorization_url: str


class AbstractPaymentGatewayOuter(ABC):
    @abstractmethod
    def create_customer(self, email: str, first_name: str, last_name: str, description: str):
        pass

    @abstractmethod
    def charge(self, customer: Customer, customer_id, amount, currency, capture_method) -> PaymentIntent:
        pass

    @abstractmethod
    def charge_recurring(self,  email, pg_customer_id, amount, currency) -> PaymentIntent:
        pass

    @staticmethod
    def get_payment_gateway(key: str):
        if key == "stripe":
            return Stripe()
        elif key == "paystack":
            return PayStack()
        else:
            raise PaymentGatewayDoesNotExistException


class Stripe(AbstractPaymentGatewayOuter):
    def create_customer(self, email: str, first_name: str, last_name: str, description: str):
        print(f"Stripe.create_customer({email}, {first_name}, {last_name}, {description})")
        stripe.api_key = STRIPE_API_KEY
        stripe_customer = stripe.Customer.create(
            email=email,
            name=first_name + ' ' + last_name,
            description=str(description)
        )
        return stripe_customer

    def charge(self, customer: Customer, customer_id, amount, currency, capture_method) -> PaymentIntent:
        print(f"Stripe.charge({customer}, {customer_id}, {amount}, {currency}, {capture_method})")
        stripe.api_key = STRIPE_API_KEY
        payment_intent = stripe.PaymentIntent.create(
            customer=customer_id,
            setup_future_usage='off_session',
            amount=amount,
            currency=currency,
            capture_method=capture_method
        )
        return PaymentIntent(id=payment_intent['id'], client_secret=payment_intent['client_secret'], authorization_url="")

    def charge_recurring(self,  email, pg_customer_id, amount, currency) -> PaymentIntent:
        print(f"Stripe.charge_recurring({pg_customer_id}, {amount}, {currency})")
        amount = int(amount) * 100
        stripe.api_key = STRIPE_API_KEY
        # Lookup the saved card
        # (you can store multiple PaymentMethods on a Customer)
        payment_methods = stripe.PaymentMethod.list(
            customer=pg_customer_id,
            type='card'
        )
        print(f"payment_methods={payment_methods}")
        # Charge the customer and payment method immediately
        if len(payment_methods.data) > 0:
            payment_intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                customer=pg_customer_id,
                payment_method=payment_methods.data[0].id,
                off_session=True,
                confirm=True
            )
            if payment_intent.status == 'succeeded':
                return PaymentIntent(
                    id=payment_intent['id'],
                    client_secret=payment_intent['client_secret'],
                    authorization_url=''
                )
            else:
                print(f"payment_intent={payment_intent}")
            return payment_intent

    def payment_methods(self, pg_customer_id: str):
        print(f"Stripe.payment_methods({pg_customer_id}")
        stripe.api_key = STRIPE_API_KEY
        # Lookup the saved card
        # (you can store multiple PaymentMethods on a Customer)
        payment_methods = stripe.PaymentMethod.list(customer=pg_customer_id, type='card')
        return payment_methods

    def payment_method(self, payment_method_id: str):
        print(f"Stripe.payment_method({payment_method_id}")
        stripe.api_key = STRIPE_API_KEY
        return stripe.PaymentMethod.retrieve(payment_method_id)


class PayStack(AbstractPaymentGatewayOuter):

    def create_customer(self, email: str, first_name: str, last_name: str, description: str):
        print(f"PayStack.create_customer({email}, {first_name}, {last_name}, {description})")
        api_key = PAYSTACK_API_KEY
        url = "https://api.paystack.co/customer"
        customer = {}
        customer["id"] = ""
        return customer

    def charge(self, customer: Customer, customer_id, amount, currency, capture_method):
        print(f"PayStack.charge({customer_id}, {amount}, {currency}, {capture_method})")
        api_key = PAYSTACK_API_KEY
        url = "https://api.paystack.co/transaction/initialize"
        headers = {
            "Authorization": "Bearer " + api_key
        }
        data = {
            'amount': amount,
            'email': customer.email,
            'currency': currency
        }
        response = requests.post(url, headers=headers, json=data)
        print(f"response: {response}")
        if response.status_code == 200:
            json = response.json()
            print(f"json: {json}")
            payment_intent = json['data']
            return PaymentIntent(
                id=payment_intent["reference"],
                client_secret=payment_intent["access_code"],
                authorization_url=payment_intent["authorization_url"])
        elif response.status_code == 403:
            response_json = response.json()
            raise PaymentGatewayChargeException(response_json['message'])

    def charge_recurring(self, email, pg_customer_id, amount, currency) -> PaymentIntent:
        print(f"PayStack.charge_recurring({pg_customer_id}, {amount}, {currency})")
        amount = int(amount) * 100
        api_key = PAYSTACK_API_KEY
        url = "https://api.paystack.co/transaction/charge_authorization"
        headers = {
            "Authorization": "Bearer " + api_key
        }
        data = {
            'amount': amount,
            'email': email
        }
        response = requests.post(url, headers=headers, json=data)
        print(f"response: {response}")
        if response.status_code == 200:
            json = response.json()
            print(f"json: {json}")
            payment_intent = json['data']
            return PaymentIntent(
                id=payment_intent["reference"],
                client_secret=payment_intent["access_code"],
                authorization_url=payment_intent["authorization_url"])


class PaymentGateway:

    @staticmethod
    def create_customer(email: str, first_name: str, last_name: str, description: str):
        stripe.api_key = STRIPE_API_KEY
        stripe_customer = stripe.Customer.create(
            email=email,
            name=first_name + ' ' + last_name,
            description=str(description)
        )
        return stripe_customer

    @staticmethod
    def cancel_payment_intent(payment_intent_id) -> bool:
        print(f"PaymentGateway.cancel_payment_intent({payment_intent_id})")
        stripe.api_key = STRIPE_API_KEY
        try:
            stripe.PaymentIntent.cancel(payment_intent_id)
            return True
        except Exception as e:
            print(f"{e}")
            pass
        return False

    @staticmethod
    def charge(customer_id, amount, currency, capture_method):
        print(f"PaymentGateway.charge({customer_id}, {amount}, {currency}, {capture_method})")
        stripe.api_key = STRIPE_API_KEY
        payment_intent = stripe.PaymentIntent.create(
            customer=customer_id,
            setup_future_usage='off_session',
            amount=amount,
            currency=currency,
            capture_method=capture_method
        )
        return payment_intent

    @staticmethod
    def charge_recurring(customer_id, amount, currency):
        print(f"PaymentGateway.charge_recurring({customer_id}, {amount}, {currency})")
        amount = int(amount) * 100
        stripe.api_key = STRIPE_API_KEY
        # Lookup the saved card
        # (you can store multiple PaymentMethods on a Customer)
        payment_methods = stripe.PaymentMethod.list(
            customer=customer_id,
            type='card'
        )
        print(f"payment_methods={payment_methods}")
        # Charge the customer and payment method immediately
        if len(payment_methods.data) > 0:
            payment_intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                customer=customer_id,
                payment_method=payment_methods.data[0].id,
                off_session=True,
                confirm=True
            )
            if payment_intent.status == 'succeeded':
                print('Successfully charged card off session')
            else:
                print(f"payment_intent={payment_intent}")
            return payment_intent

    @staticmethod
    def parse_payload(payload):
        return stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
        )

