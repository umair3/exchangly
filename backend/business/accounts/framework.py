from django.contrib.auth.models import User
from .classes import AccountClass


class AccountFramework:
    @staticmethod
    def create(email, password) -> AccountClass:
        print(f"AccountFramework.create(email={email}, password={password})")
        user: User = User()
        user.email = email
        user.username = email
        user.has_usable_password()
        user.validate_unique()
        user.set_password(password)
        user.save()
        return AccountClass(user.email, user.password)

