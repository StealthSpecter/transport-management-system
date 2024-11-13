from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    # path('', views.home, name='home'),  # Add this to handle the root URL
    path('admin/', admin.site.urls),
    path('', include('transport.urls')),
]
