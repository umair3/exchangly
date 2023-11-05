from .classes import AccountClass
from business.services.mailer import Mailer
from .framework import AccountFramework


class AccountManager:
    def create(self, account: AccountClass, account_framework: AccountFramework) -> AccountClass:
        account = account_framework.create(account.email, account.password)
        return account
