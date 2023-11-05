from typing import Type

from .models import Tag


class TagService:
    @staticmethod
    def bulk_get_or_create_by_title(tag_titles: [str]) -> [Tag]:
        print(f"TagService.bulk_get_or_create_by_title({tag_titles})")
        return list(map(TagService.get_or_create_by_title, tag_titles))

    @staticmethod
    def get_or_create_by_title(tag_title: str) -> Tag:
        print(f"TagService.get_or_create_by_title({tag_title})")
        tag_title = str(tag_title).lower()
        try:
            tag = Tag.objects.get(title=tag_title)
        except Tag.DoesNotExist:
            tag = Tag()
            tag.title = tag_title
            tag.save()
        return tag
