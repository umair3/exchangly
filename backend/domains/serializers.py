from rest_framework import serializers
from .models import Domain
from common.current_user import CurrentUserDefault
import random
import string


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


def get_spf_txt_record():
    return 'v=spf1 include:zcsend.net ~all'


def get_dkim_subdomain():
    return get_random_string(4)+'_domainkey'


def get_dkim_txt_record():
    return 'k=rsa; p='+get_random_string(8)


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__'
        # fields = ['id', 'name', 'user']
        extra_kwargs = {
            'created': {'read_only': True},
            'updated': {'read_only': True},
            'user': {'read_only': True},
            'verified': {'read_only': True},
            'txt_record': {'read_only': True},
            'spf_txt_record': {'read_only': True},
            'spf_verified': {'read_only': True},
            'dkim_subdomain': {'read_only': True},
            'dkim_txt_record': {'read_only': True},
            'dkim_verified': {'read_only': True},
        }

    name = serializers.CharField(required=True, allow_blank=False, max_length=63)
    user = serializers.HiddenField(default=CurrentUserDefault())
    txt_record = serializers.ReadOnlyField(default=get_random_string(8))
    spf_txt_record = serializers.ReadOnlyField(default=get_spf_txt_record())
    dkim_subdomain = serializers.ReadOnlyField(default=get_dkim_subdomain())
    dkim_txt_record = serializers.ReadOnlyField(default=get_dkim_txt_record())


class VerifyDkimSerializer(serializers.Serializer):
    class Meta:
        model = Domain
        fields = []

    domain_id = serializers.IntegerField(write_only=True)

    def update(self, instance, validated_data):
        return instance

    def create(self, validated_data):
        pass
