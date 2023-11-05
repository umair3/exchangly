from django.test import TestCase
from tags.models import Tag
from tags.services import TagService


class TagServiceTestCase(TestCase):
    def setUp(self) -> None:
        tag = Tag()
        tag.title = "test"
        tag.save()

    def test_get_or_create_by_title(self):
        tag = TagService.get_or_create_by_title('test')
        self.assertEqual('test', tag.title)
        tag = TagService.get_or_create_by_title('new')
        self.assertEqual('new', tag.title)

    def test_bulk_get_or_create_by_title(self):
        tags = TagService.bulk_get_or_create_by_title(['test', 'new', 'new2'])
        self.assertEqual('test', tags[0].title)
        self.assertEqual('new', tags[1].title)
        self.assertEqual('new2', tags[2].title)
