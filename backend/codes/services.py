from codes.models import Code


class CodeService:
    @staticmethod
    def verify(code_id: int, code_value: str):
        print(f"CodeService.verify({code_id}, {code_value})")
        try:
            code: Code = Code.objects.get(pk=code_id)
            if code.code == code_value:
                code.status = True
                code.save()
                return True
        except Code.DoesNotExist:
            pass
        return False
