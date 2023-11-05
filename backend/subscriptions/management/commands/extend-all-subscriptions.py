from datetime import date, datetime
from django.core.management.base import BaseCommand, CommandError
from subscriptions.exceptions import SubscriptionNotExpiredException
from ...services import SubscriptionService


class Command(BaseCommand):
    help = 'Extend all subscriptions.'

    # def add_arguments(self, parser):
    #     parser.add_argument('_ids', nargs='+', type=int)
    #     pass

    def handle(self, *args, **options):
        try:
            today = date.today()
            day_start = datetime.combine(today, datetime.min.time())
            print(f"day_start: {day_start}")
            day_end = datetime.combine(today, datetime.max.time())
            print(f"day_end: {day_end}")
            SubscriptionService.extend_during(start=day_start, end=day_end)
            self.stdout.write(self.style.SUCCESS(f"All subscriptions extended during {day_start} and {day_end}"))
        except SubscriptionNotExpiredException as e:
            error = f"Extend all subscriptions failed throwing exception {str(e)}"
            self.stdout.write(self.style.ERROR(error))
        except Exception as e:
            error = f"Extend all subscriptions failed throwing exception {str(e)}"
            self.stdout.write(self.style.ERROR(error))
