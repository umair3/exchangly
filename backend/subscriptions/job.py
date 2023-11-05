# import json
#
# from django_cron import CronJobBase, Schedule
# from subscriptions.services import SubscriptionService
# from subscriptions.models import Subscription
# from django.utils import timezone
#
#
# class Bgjob(CronJobBase):
#     RUN_EVERY_MINUTE = 1
#
#     schedule = Schedule(run_every_mins=RUN_EVERY_MINUTE)
#     code = 'subscriptions.bg_job'  # a unique code
#
#     def do(self):
#         print("Job started")
#         expiry = timezone.now()
#         expiry_string = expiry.strftime("%Y-%m-%d %H:%M:%S")
#         f = open("subscription-log.txt", "a+")
#         f.write(f"New execution: {expiry_string} \r\n")
#         try:
#             subscriptions = Subscription.objects.all()
#             for s in subscriptions:
#                 s: Subscription = s
#                 f.write(f"{expiry_string}: BP pk={s.pk}, userId={s.userId}, status={s.status}, expiry={s.expiry}, order={s.order}, trial={s.trialStatus}, trial={s.coupon} \r\n")
#                 SubscriptionService.extend(s, expire_time=expiry_string)
#                 f.write(f"{expiry_string}: AP pk={s.pk}, userId={s.userId}, status={s.status}, expiry={s.expiry}, order={s.order}, trial={s.trialStatus}, trial={s.coupon} \r\n")
#         except Subscription.DoesNotExist:
#             print("Subscriptions does not exist")
#             pass
#         f.close()
