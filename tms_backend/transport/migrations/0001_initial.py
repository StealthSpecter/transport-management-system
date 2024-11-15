# Generated by Django 5.1.3 on 2024-11-10 17:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('cust_id', models.AutoField(primary_key=True, serialize=False)),
                ('cust_name', models.CharField(max_length=100)),
                ('cust_address', models.TextField()),
                ('cust_contact', models.CharField(max_length=20)),
                ('cust_email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('d_id', models.AutoField(primary_key=True, serialize=False)),
                ('d_name', models.CharField(max_length=100)),
                ('d_contact', models.CharField(max_length=20)),
                ('d_availability', models.BooleanField(default=True)),
                ('d_license', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('v_id', models.AutoField(primary_key=True, serialize=False)),
                ('v_type', models.CharField(max_length=50)),
                ('v_status', models.CharField(max_length=20)),
                ('v_plate_num', models.CharField(max_length=20, unique=True)),
                ('v_capacity', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('o_id', models.AutoField(primary_key=True, serialize=False)),
                ('o_date', models.DateTimeField(auto_now_add=True)),
                ('o_destination', models.CharField(max_length=200)),
                ('o_pickup', models.CharField(max_length=200)),
                ('o_status', models.CharField(default='pending', max_length=20)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transport.customer')),
            ],
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('route_id', models.AutoField(primary_key=True, serialize=False)),
                ('start_location', models.CharField(max_length=200)),
                ('end_location', models.CharField(max_length=200)),
                ('driver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='transport.driver')),
                ('vehicle', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='transport.vehicle')),
            ],
        ),
        migrations.CreateModel(
            name='Shipment',
            fields=[
                ('ship_id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=20)),
                ('weight', models.FloatField()),
                ('dimensions', models.CharField(max_length=50)),
                ('destination', models.CharField(max_length=200)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='transport.order')),
                ('route', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='transport.route')),
                ('vehicle', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='transport.vehicle')),
            ],
        ),
        migrations.AddField(
            model_name='driver',
            name='vehicle',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='transport.vehicle'),
        ),
    ]
