from rest_framework import serializers
from .models import EmailIdentity
from common.current_user import CurrentUserDefault


class EmailIdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailIdentity
        fields = '__all__'
        extra_kwargs = {
            'status': {'read_only': True},
        }

    # id = serializers.IntegerField(read_only=True)
    # name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    user = serializers.HiddenField(default=CurrentUserDefault())
    email = serializers.EmailField(required=True, allow_blank=False, allow_null=False)
