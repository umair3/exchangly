from rest_framework import serializers
from .models import ChargeOption

class ChargeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChargeOption
        fields = '__all__'

    # id = serializers.IntegerField(read_only=True)
    # optiontype = serializers.CharField(required=True, allow_blank=False, max_length=20)
    # price = serializers.DecimalField(default=0.00, decimal_places=2, max_digits=9)
    # currency = serializers.CharField(required=True, allow_blank=False, max_length=3)

    
