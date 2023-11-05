from django.test import TestCase
from codes.models import Code
from django.contrib.auth.models import User
from django.utils.dateformat import DateFormat

from codes.services import CodeService


class TestCode(TestCase):
    expiry = ''

    def setUp(self):
        user = User()
        user.save()
        code = Code()
        code.user = user
        code.code = Code.generate_code()
        code.expiry = Code.default_expiry()
        TestCode.expiry = code.expiry
        print(f"code: {code.expiry}")
        code.save()

    def test_create(self):
        """Check if code is created correctly."""
        user = User.objects.get(pk=1)
        code = Code.objects.get(user=user)
        self.assertEqual(
            DateFormat(code.expiry).format("Y-m-d H:i:s"),
            DateFormat(TestCode.expiry).format("Y-m-d H:i:s")
        )
        self.assertEqual(code.status, False)
        self.assertGreaterEqual(code.code, 100000, "Code generated should be greater than 100000")
        self.assertLessEqual(code.code, 999999, "Code generated should be less than 999999")


class TestCodeService(TestCase):
    def setUp(self) -> None:
        user = User()
        user.email = "test@test.test"
        user.first_name = "Test"
        user.last_name = "User"
        user.save()
        # code = Code()
        # code.user = user
        # code.code = Code.generate_code()
        # code.expiry = Code.default_expiry()
        # TestCode.expiry = code.expiry
        # print(f"code: {code.expiry}")
        # code.save()
        code = Code()
        code.pk = 1
        code.user = user
        code.code = 100000
        code.expiry = Code.default_expiry()
        code.save()

    def test_verify(self):
        # user = User.objects.get(email='test@test.test')
        # code = Code.objects.get(user=user.pk)
        self.assertTrue(CodeService.verify(1, 100000))
        self.assertFalse(CodeService.verify(1, 12345))

