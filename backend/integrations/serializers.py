from rest_framework import serializers
from .models import Integration
from common.current_user import CurrentUserDefault


class IntegrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Integration
        fields = '__all__'
        # fields = ['id', 'title', 'type', 'host', 'port', 'key', 'passphrase', 'default']

    # email = serializers.EmailField(required=True)
    user = serializers.HiddenField(default=CurrentUserDefault())

    # def create(self, validated_data):
    #     print('IntegrationSerializer->create()')
    #     # user = User.objects.create_user(
    #     #     validated_data['username'],
    #     #     validated_data['email'],
    #     #     # make_password(validated_data['password']),
    #     #     validated_data['password'],
    #     #     first_name=validated_data['first_name'],
    #     #     last_name=validated_data['last_name']
    #     # )
    #     print(f"validated_data={validated_data}")
    #     integration = Integration(**validated_data)
    #     integration.user = validated_data['user']
    #     integration.save()
    #     return integration
