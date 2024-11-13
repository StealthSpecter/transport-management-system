from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Customer(models.Model):
    cust_id = models.AutoField(primary_key=True)
    cust_name = models.CharField(max_length=100)
    cust_address = models.TextField()
    cust_contact = models.CharField(max_length=20)
    cust_email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Will store hashed password
    
    def __str__(self):
        return self.cust_name
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

class Vehicle(models.Model):
    VEHICLE_STATUS_CHOICES = [
        ('available', 'Available'),
        ('assigned', 'Assigned'),
        ('maintenance', 'Maintenance')
    ]
    
    v_id = models.AutoField(primary_key=True)
    v_type = models.CharField(max_length=50)
    v_status = models.CharField(max_length=20, choices=VEHICLE_STATUS_CHOICES, default='available')
    v_plate_num = models.CharField(max_length=20, unique=True)
    v_capacity = models.FloatField()
    vehicle_id = models.CharField(max_length=20, unique=True)  # For VEH001 format
    
    def __str__(self):
        return f"{self.v_type} - {self.vehicle_id}"

class Driver(models.Model):
    DRIVER_STATUS_CHOICES = [
        ('available', 'Available'),
        ('assigned', 'Assigned'),
        ('off_duty', 'Off Duty')
    ]
    
    d_id = models.AutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)
    d_name = models.CharField(max_length=100)
    d_contact = models.CharField(max_length=20)
    d_status = models.CharField(max_length=20, choices=DRIVER_STATUS_CHOICES, default='available')
    driver_id = models.CharField(max_length=20, unique=True)  # For DRV001 format
    
    def __str__(self):
        return self.d_name

class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('in_transit', 'In Transit'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ]
    
    o_id = models.AutoField(primary_key=True)
    order_id = models.CharField(max_length=20, unique=True)  # For ORD123 format
    customer_email = models.ForeignKey(Customer, on_delete=models.CASCADE)
    o_date = models.DateTimeField(auto_now_add=True)
    o_destination = models.CharField(max_length=200)
    o_pickup = models.CharField(max_length=200)
    o_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    weight = models.FloatField()
    dimensions = models.CharField(max_length=50)
    # special_instructions = models.TextField(blank=True, null=True)
    # expected_delivery = models.DateField()
    delivery_type = models.CharField(max_length=50, default='Standard Delivery')

class Shipment(models.Model):
    SHIPMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_transit', 'In Transit'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ]
    
    ship_id = models.AutoField(primary_key=True)
    shipment_id = models.CharField(max_length=20, unique=True)  # For SHP001 format
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=SHIPMENT_STATUS_CHOICES, default='pending')
    # pickup_time = models.DateTimeField(null=True, blank=True)
    # delivery_time = models.DateTimeField(null=True, blank=True)
    # current_location = models.CharField(max_length=200, null=True, blank=True)
    tracking_updates = models.JSONField(default=list)  # Store tracking history
