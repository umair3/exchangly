from rest_framework import serializers
from .models import Audience
from common.current_user import CurrentUserDefault


class AudienceListSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        audience = [Audience(**item) for item in validated_data]
        return Audience.objects.bulk_create(audience)

    def update(self, instance, validated_data):
        pass


class AudienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audience
        fields = '__all__'
        # fields = ['id', 'email', 'status', 'tags']
        # list_serializer_class = AudienceListSerializer

    email = serializers.EmailField(required=True)
    user = serializers.HiddenField(default=CurrentUserDefault())


# class BookListSerializer(serializers.ListSerializer):
#     def create(self, validated_data):
#         books = [Book(**item) for item in validated_data]
#         return Book.objects.bulk_create(books)
#
# class BookSerializer(serializers.Serializer):
#     ...
#     class Meta:
#         list_serializer_class = BookListSerializer
