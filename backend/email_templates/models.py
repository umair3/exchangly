from django.db import models
from django.contrib.auth.models import User
# Create your models here.
# contact us template
# download brochure template
# homepage form template
from tinymce.models import HTMLField


STATUS_CHOICES = (
    ("PUBLISH", "Publish"),
    ("HIDE", "Hide")
)


class EmailTemplate(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    subject = models.CharField(max_length=200, blank=False, default='')
    body = HTMLField()
    description = models.CharField(max_length=500, blank=True, null=True, default='')
    thumbnail = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PUBLISH')  # PUBLISH | HIDE
    order = models.IntegerField(default=0)
    user_defined = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}: {self.subject}"


class UserEmailTemplate(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    subject = models.CharField(max_length=200, blank=False, default='')
    body = HTMLField()
    description = models.CharField(max_length=500, blank=True, null=True, default='')
    user_defined = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.id}: {self.subject}"

# Verify user
# Verify template

#
# Dear {PARAM_NAME},
#
# We have received

# <form action="https://mailthis.to/you@mail.com"
#     method="POST" encType="multipart/form-data">
#     <input type="text" name="name" placeholder="Your name">
#     <input type="email" name="_replyto" placeholder="Your email">
#     <textarea name="message" placeholder="Enter your message here"></textarea>
#     <input type="file" name="file" placeholder="Attachments (optional)">
#     <input type="hidden" name="_subject" value="Contact form submitted">
#     <input type="hidden" name="_after" value="https://myhomepage.net/">
#     <input type="hidden" name="_honeypot" value="">
#     <input type="hidden" name="_confirmation" value="">
#     <input type="hidden" name="_template" value="">
#     <input type="submit" value="Send">
# </form>

# Sent from noreply@exchangly.com
# Dear Admin,
# Another contact form has been submitted with following information;
# Customer Name: {FIELD_NAME}
# Customer Message:
# {PARAM_MESSAGE}
# Regards,
# exchangly.com

# Add as an Addon
# Hire a consultant (monthly)| Forms2Mail (usage) [total_quota], [used_quota], [created]


# <form action="https://mailthis.to/you@mail.com"
#     method="POST" encType="multipart/form-data">
#     <input type="text" name="name" placeholder="Your name">
#     <input type="email" name="_replyto" placeholder="Your email">
#     <textarea name="message" placeholder="Enter your message here"></textarea>
#     <input type="file" name="file" placeholder="Attachments (optional)">
#     <input type="hidden" name="_subject" value="Contact form submitted">
#     <input type="hidden" name="_after" value="https://myhomepage.net/">
#     <input type="hidden" name="_honeypot" value="">
#     <input type="hidden" name="_confirmation" value="">
#     <input type="hidden" name="_template" value="">
#     <input type="submit" value="Send">
# </form>


