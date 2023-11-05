from rest_framework import serializers
from django.contrib.auth.models import User
# from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    # snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }

#     def create(self, validated_data):
#         print('CustomerSerializer->create()')
#         # user = User.objects.create_user(
#         #     validated_data['username'],
#         #     validated_data['email'],
#         #     # make_password(validated_data['password']),
#         #     validated_data['password'],
#         #     first_name=validated_data['first_name'],
#         #     last_name=validated_data['last_name']
#         # )
#         customer = Customer(**validated_data)
#         customer.set_password(validated_data['password'])
#         customer.save()
#         return customer


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ['email', 'password']

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
