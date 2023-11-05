from codes.models import Code
from django.contrib.auth.models import User


class AccountService:
    def __init__(self, user: User):
        self.user: User = user

    def create_verification_url(self, code: Code, redirect_url, verify_page_url) -> str:
        code.user = self.user
        code.code = Code.generate_code()
        code.expiry = Code.default_expiry()
        code.save()
        return verify_page_url + '?codeId=' + str(code.pk) + '&code=' + str(code.code) + '&url=' + redirect_url

    def create_reset_pass_url(self, code: Code, reset_page_url: str) -> str:
        code.user = self.user
        code.code = Code.generate_code()
        code.expiry = Code.default_expiry()
        code.save()
        return reset_page_url + '?codeId=' + str(code.pk) + '&code=' + str(code.code)
