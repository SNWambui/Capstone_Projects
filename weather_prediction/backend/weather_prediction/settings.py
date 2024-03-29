"""
Django settings for weather_prediction project.

Generated by 'django-admin startproject' using Django 4.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import environ
import os  

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# rename the base_direct to be the backend direct and get frontend direc
BACKEND_DIR = BASE_DIR 
FRONTEND_DIR = BASE_DIR.parent /'frontend' 

# Take environment variables from .env file
environ.Env.read_env(BACKEND_DIR / '.env')

# set the environment and DEBUG status
env = environ.Env()
DEBUG = env.bool('DEBUG', default=False)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# Raises Django's ImproperlyConfigured
# exception if SECRET_KEY not in os.environ
SECRET_KEY = env('SECRET_KEY')


ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'weather_patterns',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]

ROOT_URLCONF = 'weather_prediction.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [os.path.join(BASE_DIR, 'frontend/build')],
        'DIRS': [FRONTEND_DIR / 'build'],
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

WSGI_APPLICATION = 'weather_prediction.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BACKEND_DIR /'db.sqlite3',
    }
}
# uncomment below for production or with other local dtb
# DATABASES = {
#     # read os.environ['DATABASE_URL'] and raises
#     # ImproperlyConfigured exception if not found
#     #
#     # The db() method is an alias for db_url().
#     'default': env.db(),

#     # read os.environ['SQLITE_URL']
#     'extra': env.db_url(
#         'SQLITE_URL',
#         default='sqlite:////tmp/my-tmp-sqlite.db'
#     )
# }


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# declare that the frontend contains the static files
STATICFILES_DIRS = [FRONTEND_DIR / 'build' / 'static']

# for production: caching with CDN performance
STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage')

# root directtory for static files
STATIC_ROOT = BACKEND_DIR / 'static'

# important for production and handling wsgi
WHITENOISE_ROOT = FRONTEND_DIR / 'build' / 'root'

# REST_FRAMEWORK = {

#     # 'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',),
#     'DEFAULT_PARSER_CLASSES': [
#         'rest_framework.parsers.JSONParser',
#     ]
# }

# important for rest API connection with frontend
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True

# # change to https://app.example.com in production settings
CORS_ORIGIN_WHITELIST = [env('CORS_ORIGIN_WHITELIST')]
CSRF_TRUSTED_ORIGINS = [env('CSRF_TRUSTED_ORIGINS')]

# change the values to environment
# SECURE_HSTS_SECONDS = 35  # Unit is seconds; *USE A SMALL VALUE FOR TESTING!*
# overall important security settings
# ========================
# SECURITY SETTINGS

# cookies
CSRF_COOKIE_SECURE = env.bool('CSRF_COOKIE_SECURE', default=True)
CSRF_COOKIE_HTTPONLY = env.bool('CSRF_COOKIE_HTTPONLY', default=True)
SESSION_COOKIE_SECURE = env.bool('SESSION_COOKIE_SECURE', default=True)

# https requests and rerouting
# min value of 2,592,000, for production but small value for testing
SECURE_HSTS_SECONDS = env('SECURE_HSTS_SECONDS')
SECURE_HSTS_PRELOAD = env.bool('SECURE_HSTS_PRELOAD', default=True)
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool('SECURE_HSTS_INCLUDE_SUBDOMAINS', default=True)
# SECURE_PROXY_SSL_HEADER = env('SECURE_PROXY_SSL_HEADER')
SECURE_SSL_REDIRECT = env.bool('SECURE_SSL_REDIRECT', default=True)
SECURE_BROWSER_XSS_FILTER = env.bool('SECURE_BROWSER_XSS_FILTER', default=True)
SECURE_CONTENT_TYPE_NOSNIFF = env.bool('SECURE_CONTENT_TYPE_NOSNIFF', default=True)
