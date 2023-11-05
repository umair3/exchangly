SMTP endpoint: 
email-smtp.ap-southeast-1.amazonaws.com
STARTTLS:
Port 25, 587 or 2587
Transport Layer Security (TLS):
Required
TLS Wrapper Port:
465 or 2465
===========================================
ses-smtp-user.20211024-034432
SMTP Username:
AKIAVXPDZH75BNGKSPEM
SMTP Password:
BFiZAth6Z8GKBO1d95M89HTLgJR7ghri3pvEOTYrwDrc
ses-smtp-user.20211024-034432
SMTP Username:
AKIAVXPDZH75BNGKSPEM
SMTP Password:
BFiZAth6Z8GKBO1d95M89HTLgJR7ghri3pvEOTYrwDrc
============================================
ReCAPTCHA V3 Keys
Site Key
6LfxnSQdAAAAABTcC5ykGGgAajEDBaJfEaDS3SWD
Secret Key
6LfxnSQdAAAAADE7pYY7ICnqIS0FG1galtdGxr6J
Site Key
6LfxnSQdAAAAABTcC5ykGGgAajEDBaJfEaDS3SWD
Secret Key
6LfxnSQdAAAAADE7pYY7ICnqIS0FG1galtdGxr6J
============================================
https://exchangly.com/activities/
https://exchangly.com/activity_details/
https://exchangly.com/api-auth/logout/
https://exchangly.com/audience/
https://exchangly.com/audience/?status=subscribed&tags=1
https://exchangly.com/audience_bulk/
https://exchangly.com/campaigns/
# https://exchangly.com/campaign_audience/
https://exchangly.com/campaign_tags/
https://exchangly.com/campaign_executions/
https://exchangly.com/campaign_executions/?campaignId=1&status=NOT_STARTED
https://exchangly.com/campaign_execution_logs/
https://exchangly.com/campaign_jobs/
https://exchangly.com/charge_options/
https://exchangly.com/dispatcher/?receiver=umair.anwr@gmail.com
https://exchangly.com/dispatcher/
https://exchangly.com/forms2email/
https://exchangly.com/integrations/
https://exchangly.com/orders/
https://exchangly.com/payments/
https://exchangly.com/pricing_plans/
# https://exchangly.com/subscription/
https://exchangly.com/subscriptions/
https://exchangly.com/profile/
https://exchangly.com/tags/
https://exchangly.com/tags/?title=customer
https://exchangly.com/templates/
https://exchangly.com/user_email_templates/
============================================
Dashboard Features:
1. Total Audience (+1 this week) with new added in current week
2. User Activity (API done, Activity log (pending))
3. Emails Sent
4. Remaining Balance of Emails and Contacts.
5. Key Performance Indicators (skipping for now) which include Email Open Rate (EOR), Click Through Rate (CTR), Email Bounce Rate (EBR), User Unsubscribe Rate (UUR)
============================================
BLOCKERS
 - By default, send email to all subscribers. [SKIP]
============================================
marry.james@exchangly.com
============================================
CLIENT WAITING
 - barry.walsh@exchangly.com [Umair]
 - Estimate on CRM integration [Umair]
NEW FEATURES
 - Email server Addon [in-progress] [Umair] [Discussion Pending]
 - Settings Billing page in Setting with Upgrade Option [PENDING] [Usama - UI] [https://www.nudgify.com/docs/knowledge-base/manage-your-plan/]
 - Current Subscriptions in setting [PENDING] [USAMA]
 - Cancel Subscription feature on settings billing page [PENDING] [Usama - UI]
 - Download execution logs in CSV format on execution logs page. [PENDING] [Umair]
 - Rotate execution logs after one month [PENDING] [Umair]
BUGS
 - Add multiple tags in from field instead of audience in create campaign. [Umair]
https://exchangly.com/campaign_tags/
 - If email identities count is zero, show create email identity option. [Usama] [BLOCKED]
 - Email Identity API [Umair]
 - Add preview text field [Umair]
 - If audience is zero, show import contacts option. Make a call to check audience count. [Usama]
 - Campaign execution logs stats API [Umair]
 - Filter audience by tags. Add tag filter dropdown [Usama]
 - Add check in order API to restrict addon to be purchased only with associated plan. [Umair]
 - Send email issue on form2Email [Umair] !
 - UserTemplate GET, POST, PUT, DELETE APIs [Umair]
 - Forms2Email, instead of template id, use form id field. [Usama | Umair]
 - Forms2Email, get user from session instead of API [Umair]
 - Forms2Email, remove reply to field from email forms [Umair]
 - Form2Email, Forms listing page, Create, Update, Delete on frontend [Usama | Blocked]
 - Form2Email UI+Plus discussion [Umair | Usama]
_after=https://canalmall.com.pk/thankyou.html
_download=https://canalmall.com.pk/downlaods/brochure.pdf
302 https://canalmall.com.pk/thankyou.html?brochure&download=https://canalmall.com.pk/downlaods/brochure.pdf
=============================================
# Premium | $65/monthly | Renew on November 3, 2022 | ACTIVE | Cancel Button.
# Hire a Consultant | 500$/month | Renew on November 6, 2022 | ACTIVE | Cancel Button.
# Forms2Email | 5$/month | Renew on November 3, 2022 | ACTIVE| Cancel Button.
# status can have PENDING | ACTIVE | CANCELED | EXPIRED (expired is only set from frontend)
=============================================
To Test
POST payment with order_id, paymentGateway

https://exchangly.com/verify?codeId=56&code=909751&url=
Email Identity is not verified even when code is verified. Check accounts verify view.

# Audience: Tags verify API and 
# make to_audience make it optional and 
# in the API get emails instead of ids and 
# store ids in the db
    # tag, audience
    # 0, 0, false
    # 1, 0, true
    # 0, 1, true
    # 1, 1, true

# Campaign Execution Logs Stats API.
# QUEUED, SENT, DELIVERED, DELIVERY_FAILED, READ, LAST_READ, OPENED, OPENED_TIMES, 

# Fill Activity