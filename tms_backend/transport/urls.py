from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register_user, name='register'),
    path('login', views.user_login, name='login'),
    path('add-orders', views.create_order, name='create-order'),
    # path('shipments/track/<str:shipment_id>/', views.track_shipment, name='track-shipment'),
    path('shipment-tracking', views.track_shipment, name='track-shipments'),
    path('add-driver', views.add_driver, name='add-driver'),
    path('add-vehicle', views.add_vehicle, name='add-vehicle'),
]
