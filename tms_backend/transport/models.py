# transport/models.py
from django.db import models

class Customer(models.Model):
    cust_id = models.AutoField(primary_key=True)
    cust_name = models.CharField(max_length=100)
    cust_address = models.TextField()
    cust_contact = models.CharField(max_length=20)
    cust_email = models.EmailField(unique=True)

    def __str__(self):
        return self.cust_name

class Vehicle(models.Model):
    v_id = models.AutoField(primary_key=True)
    v_type = models.CharField(max_length=50)
    v_status = models.CharField(max_length=20)
    v_plate_num = models.CharField(max_length=20, unique=True)
    v_capacity = models.FloatField()

    def __str__(self):
        return f"{self.v_type} - {self.v_plate_num}"

class Driver(models.Model):
    d_id = models.AutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True)
    d_name = models.CharField(max_length=100)
    d_contact = models.CharField(max_length=20)
    d_availability = models.BooleanField(default=True)
    d_license = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.d_name

class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True)
    start_location = models.CharField(max_length=200)
    end_location = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.start_location} to {self.end_location}"

class Order(models.Model):
    o_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    o_date = models.DateTimeField(auto_now_add=True)
    o_destination = models.CharField(max_length=200)
    o_pickup = models.CharField(max_length=200)
    o_status = models.CharField(max_length=20, default='pending')

    def __str__(self):
        return f"Order {self.o_id} - {self.customer.cust_name}"

class Shipment(models.Model):
    ship_id = models.AutoField(primary_key=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True)
    route = models.OneToOneField(Route, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20)
    weight = models.FloatField()
    dimensions = models.CharField(max_length=50)
    destination = models.CharField(max_length=200)

    def __str__(self):
        return f"Shipment {self.ship_id} - Order {self.order.o_id}"
