"""
Django settings for mmbe project.

Generated by 'django-admin startproject' using Django 3.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os.path
from pathlib import Path
import environ
import os

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
print(BASE_DIR)
# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
EMAIL = env.dict('EMAIL', cast={'value': str}, default={})

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-fsm@r9720ons9ln7hufimxp$m^!k%p9(@1ciy9&h4rp1+6l83o'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    # 'debug_toolbar',
    'rest_framework',
    'import_export',
    'letsencrypt',
    'corsheaders',
    'accounts',
    'activities',
    'audience',
    'campaigns',
    'charge_options',
    'codes',
    'coupons',
    'dispatcher',
    'domains',
    'email_identities',
    'email_subscriptions',
    'email_templates',
    'forms2email',
    'home',
    'integrations',
    'orders',
    'payments',
    'payment_gateways',
    'payment_methods',
    'pricing_plans',
    'request_demos',
    'subscriptions',
    'tags',
    # 'templates',
    'tinymce'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # 'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mmbe.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mmbe.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # },
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql_psycopg2',
    #     'NAME': 'mmdb',
    #     'USER': 'dbmasteruser',
    #     'PASSWORD': 'yN669(`zXv6U(QD,<iI##RO4;v?zy,Ti',
    #     'HOST': 'ls-0bdaf5ad8daaaf999ebc6c603549b2e9b67d89c8.ccctlswxykjy.ap-southeast-1.rds.amazonaws.com',
    #     'PORT': '5432',
    # }
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASS'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# SESSION_COOKIE_DOMAIN = "app.localhost"
TEST_KEY = 'SecretKey123'

STRIPE_API_KEY = 'sk_test_51Jj4QULy02qNYQG26iTRz9t7M2FD6lgpLOzVcZKEEmZBTWiDpBLWxA3NdzDiz2OSLHcg53o4pBSEIdDuv4mGNAkJ00tIkIxrDf'
PAYSTACK_API_KEY = ''

SESSION_COOKIE_DOMAIN = ".exchangly.com"
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_SAMESITE = 'None'
DOMAIN_NAME = ".exchangly.com"

# CSRF_COOKIE_AGE = 31449600  # seconds (approx 1 year)
# CSRF_COOKIE_DOMAIN = '.exchangly.com'
# CSRF_COOKIE_HTTPONLY = False
# CSRF_COOKIE_NAME = 'csrftoken'
# CSRF_COOKIE_PATH = '/'
# CSRF_COOKIE_SAMESITE = 'Lax'
# CSRF_COOKIE_SECURE = True
# CSRF_USE_SESSIONS = True
# # CSRF_FAILURE_VIEW = 'django.views.csrf.csrf_failure'
# CSRF_HEADER_NAME = 'HTTP_X_CSRFTOKEN'
# CSRF_TRUSTED_ORIGINS = ['*.exchangly.com']
# # CSRF_TRUSTED_ORIGINS = ['app.exchangly.com', 'localhost:3000']


# CORS_ALLOWED_ORIGIN_REGEXES = [
#     r"^https://\w+\.exchangly\.com$",
#     r"^http://\w+\.exchangly\.com$"
# ]

CORS_ALLOWED_ORIGINS = [
    "https://app.exchangly.com",
    "http://app.exchangly.com",
    "http://app.exchangly.com:3000",
    "http://myapp.exchangly.com",
    "https://myapp.exchangly.com",
    "http://myapp.exchangly.com:3000",
    "https://myapp.exchangly.com:3000",
    "http://localhost:3000",
    "https://localhost:3000",
    "http://127.0.0.1:3000",
    "https://127.0.0.1:3000"
]

# CORS_URLS_REGEX = r"^/.*$"

# CORS Config
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

INTERNAL_IPS = [
    # ...
    "127.0.0.1",
    # ...
]


RECAPTCHA_SECRET_KEY = env('RECAPTCHA_SECRET_KEY')

REST_FRAMEWORK = {
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

URL_LOGIN = env('URL_LOGIN')
URL_VERIFY = env('URL_VERIFY')
URL_RESET_PASS = env('URL_RESET_PASS')

TINYMCE_DEFAULT_CONFIG = {
    'height': 1000,
    # 'theme_advanced_buttons3_add': 'code',
    'plugins': 'code',  # along with other plugins, e.g. 'link lists code'
    # 'toolbar': 'code', # along with other buttons, e.g. 'bold italic | code'
}
