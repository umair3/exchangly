from .models import Code
from .serializers import CodeSerializer
from rest_framework import viewsets


class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
