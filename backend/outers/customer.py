from django.contrib.auth.models import User


class Customer:
    def __init__(self, user: User):
        print(f"Customer({user})")
        self.first_name = user.first_name
        self.last_name = user.last_name
        self.email = user.email
