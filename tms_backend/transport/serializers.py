from rest_framework import serializers
from .models import Customer, Vehicle, Driver, Order, Shipment

class CustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Customer
        fields = ['cust_id', 'cust_name', 'cust_address', 'cust_contact', 'cust_email', 'password']
    
    def create(self, validated_data):
        customer = Customer(**validated_data)
        customer.set_password(validated_data['password'])
        customer.save()
        return customer

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class ShipmentTrackingSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    vehicle = serializers.SerializerMethodField()
    driver = serializers.SerializerMethodField()
    order = serializers.SerializerMethodField()
    
    class Meta:
        model = Shipment
        fields = '__all__'
    
    def get_customer(self, obj):
        return {
            'name': obj.order.customer.cust_name,
            'contact': obj.order.customer.cust_contact,
            'address': obj.order.customer.cust_address
        }
    
    def get_vehicle(self, obj):
        if obj.vehicle:
            return {
                'type': obj.vehicle.v_type,
                'id': obj.vehicle.vehicle_id,
                'capacity': obj.vehicle.v_capacity
            }
        return None
    
    def get_driver(self, obj):
        if obj.driver:
            return {
                'name': obj.driver.d_name,
                'id': obj.driver.driver_id,
                'contact': obj.driver.d_contact
            }
        return None
    
    def get_order(self, obj):
        return {
            'order_id': obj.order.order_id,
            'pickup_location': obj.order.o_pickup,
            'delivery_location': obj.order.o_destination,
            'weight': obj.order.weight,
            'dimensions': obj.order.dimensions,
            'type': obj.order.delivery_type,
            # 'special_instructions': obj.order.special_instructions,
            # 'expected_delivery': obj.order.expected_delivery
        }
