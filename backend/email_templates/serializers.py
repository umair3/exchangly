from common.current_user import CurrentUserDefault
from rest_framework import serializers
from .models import EmailTemplate, UserEmailTemplate


class EmailTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailTemplate
        fields = '__all__'


class UserEmailTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEmailTemplate
        fields = '__all__'

    user = serializers.HiddenField(default=CurrentUserDefault())

