# tms_backend/settings.py

import os  # Make sure to add this at the top of your settings.py
from pathlib import Path


SECRET_KEY='rqq_yzfbnlhqy-fec)a0(xm_q#24i2h2y*2%b#-v)b5r!q%#t%'
BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = True  # Set to False in production

ROOT_URLCONF = 'tms_backend.urls'

ALLOWED_HOSTS = ['localhost', '127.0.0.1']  # Add more allowed hosts if necessary

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",  # Correct path joining
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # Correct use of os.path.join
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

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'transport',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Add this line
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'tms_db',  # Name of the database you created
        'USER': 'tms_user',  # Your MySQL username
        'PASSWORD': 'yourpassword',  # Your MySQL password
        'HOST': 'localhost',  # If running locally
        'PORT': '3306',  # Default MySQL port
    }
}

# CORS settings
CORS_ALLOW_ALL_ORIGINS = True  # For development only

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
