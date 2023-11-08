"""mmbe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, re_path
from django.contrib import admin
from django.urls import path, include
import accounts.urls
import activities.urls
import audience.urls
import campaigns.urls
import charge_options.urls
import codes.urls
import coupons.urls
import domains.urls
import dispatcher.urls
import email_identities.urls
import email_templates.urls
import forms2email.urls
import home.urls
import integrations.urls
import orders.urls
import payments.urls
import payment_gateways.urls
import payment_methods.urls
import pricing_plans.urls
import subscriptions.urls
import tags.urls

admin.site.site_header = "exchangly.com admin"
admin.site.site_title = "exchangly.com admin portal"
admin.site.index_title = "Welcome to exchangly.com admin portal"

urlpatterns = [
    path('', include(home.urls)),  # serve pages before REST APIs
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(accounts.urls)),
    path('', include(activities.urls)),
    path('', include(audience.urls)),
    path('', include(campaigns.urls)),
    path('', include(charge_options.urls)),
    path('', include(codes.urls)),
    path('', include(coupons.urls)),
    path('', include(dispatcher.urls)),
    path('', include(domains.urls)),
    path('', include(email_identities.urls)),
    path('', include(email_templates.urls)),
    path('', include(forms2email.urls)),
    path('', include(integrations.urls)),
    path('', include(pricing_plans.urls)),
    path('', include(orders.urls)),
    path('', include(payments.urls)),
    path('', include(payment_gateways.urls)),
    path('', include(payment_methods.urls)),
    path('', include(subscriptions.urls)),
    path('', include(tags.urls)),
    # re_path(r'^\.well-known/', include('letsencrypt.urls')),
    path('__debug__/', include('debug_toolbar.urls')),
]
