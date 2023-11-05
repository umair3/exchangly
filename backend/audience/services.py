from .models import Audience
from django.contrib.auth.models import User
from tags.services import TagService


class AudienceService:

    @staticmethod
    def bulk_create(user: User, emails: [str], status: str, tag_titles: [str]) -> [Audience]:
        print(f"AudienceService.bulk_create({user}, {emails}, {status}, {tag_titles})")
        tags = TagService.bulk_get_or_create_by_title(tag_titles)
        audience_list: [Audience] = []
        for email in emails:
            audience = Audience(user=user, email=email, status=status)
            audience_list.append(audience)
        audience_list = Audience.objects.bulk_create(audience_list)
        print(f"audience_list={audience_list}")
        for audience in audience_list:
            audience.tags.set(tags)
        return audience
