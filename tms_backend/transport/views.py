from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Customer, Vehicle, Driver, Order, Shipment
from .serializers import (
    CustomerSerializer, VehicleSerializer, DriverSerializer,
    OrderSerializer, ShipmentTrackingSerializer
)

@api_view(['POST'])
def register_user(request):
    if Customer.objects.filter(cust_email=request.data.get('cust_email')).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        customer = serializer.save()
        customer.set_password(request.data['password'])
        customer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        customer = Customer.objects.get(cust_email=email)
        if customer.check_password(password):
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Customer.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_order(request):
    customer = get_object_or_404(Customer, cust_id=request.data.get('customer_id'))
    
    # Add customer to order data
    order_data = {
        'customer_email': customer.cust_email,
        'order_id': f"ORD{Order.objects.count() + 1:03d}",
        'o_pickup': request.data.get('o_pickup'),
        'o_destination': request.data.get('o_destination'),
        'weight': request.data.get('weight'),
        'dimensions': request.data.get('dimensions'),
        'delivery_type': request.data.get('delivery_type'),
    }
    
    order_serializer = OrderSerializer(data=order_data)
    if order_serializer.is_valid():
        order = order_serializer.save()
        
        # Find available driver and vehicle
        available_driver = Driver.objects.filter(d_status='available').first()
        available_vehicle = Vehicle.objects.filter(v_status='available').first()
        
        if available_driver and available_vehicle:
            # Create shipment
            shipment_data = {
                'order': order.o_id,
                'vehicle': available_vehicle.v_id,
                'driver': available_driver.d_id,
                'shipment_id': f"SHP{Shipment.objects.count() + 1:03d}",
                'tracking_updates': [{
                    'status': 'Order Created',
                    'location': order.o_pickup,
                    'timestamp': order.o_date.isoformat()
                }]
            }
            
            shipment = Shipment.objects.create(**shipment_data)
            
            # Update statuses
            available_driver.d_status = 'assigned'
            available_driver.vehicle = available_vehicle
            available_driver.save()
            
            available_vehicle.v_status = 'assigned'
            available_vehicle.save()
            
            order.o_status = 'assigned'
            order.save()
            
            serializer = ShipmentTrackingSerializer(shipment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response({
            'error': 'No available drivers or vehicles'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def track_shipment(request, shipment_id=None):
    if shipment_id:
        shipment = get_object_or_404(Shipment, shipment_id=shipment_id)
        serializer = ShipmentTrackingSerializer(shipment)
        return Response(serializer.data)
    
    # If no shipment_id, return all shipments for the customer
    customer_id = request.GET.get('customer_id')
    if customer_id:
        shipments = Shipment.objects.filter(order__customer__cust_id=customer_id)
        serializer = ShipmentTrackingSerializer(shipments, many=True)
        return Response(serializer.data)
    
    return Response({'error': 'Customer ID required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_driver(request):
    request.data['driver_id'] = f"DRV{Driver.objects.count() + 1:03d}"
    serializer = DriverSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_vehicle(request):
    request.data['vehicle_id'] = f"VEH{Vehicle.objects.count() + 1:03d}"
    serializer = VehicleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
