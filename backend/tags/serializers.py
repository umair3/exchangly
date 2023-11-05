from rest_framework import serializers
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
        # fields = ['title']

    # email = serializers.EmailField(required=True)


# class BookListSerializer(serializers.ListSerializer):
#     def create(self, validated_data):
#         books = [Book(**item) for item in validated_data]
#         return Book.objects.bulk_create(books)
#
# class BookSerializer(serializers.Serializer):
#     ...
#     class Meta:
#         list_serializer_class = BookListSerializer
