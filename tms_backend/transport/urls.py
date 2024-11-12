from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomerViewSet, VehicleViewSet, DriverViewSet,
    RouteViewSet, OrderViewSet, ShipmentViewSet
)

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'shipments', ShipmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
