import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search, Package, Truck, MapPin, Calendar, User, Clock } from 'lucide-react';

const ShipmentTracking = () => {
  // Sample data to demonstrate layout
  const sampleData = [
    {
      id: "SHP001",
      order_id: "ORD123",
      status: "In Transit",
      customer: {
        name: "John Doe",
        contact: "+1 234-567-8900",
        address: "123 Main St, City"
      },
      pickup: {
        address: "456 Warehouse Ave, Industrial District",
        date: "2024-11-10",
        time: "09:00 AM"
      },
      destination: {
        address: "789 Delivery St, Residential Area",
        expected_date: "2024-11-12"
      },
      shipment_details: {
        weight: "150",
        dimension: "100x80x60",
        type: "Standard Delivery",
        special_instructions: "Handle with care"
      },
      assigned_resources: {
        driver: {
          id: "DRV001",
          name: "Mike Smith",
          contact: "+1 234-567-8901",
          status: "On Duty"
        },
        vehicle: {
          id: "VEH001",
          type: "Medium Truck",
          capacity: "500kg",
          status: "In Use"
        }
      },
      tracking_updates: [
        { timestamp: "2024-11-10 09:00 AM", status: "Order Picked Up", location: "Warehouse" },
        { timestamp: "2024-11-10 02:00 PM", status: "In Transit", location: "City Highway" },
        { timestamp: "2024-11-11 10:00 AM", status: "At Distribution Center", location: "Local Hub" }
      ]
    },
    // Add more sample shipments here...
  ];

  const [shipments, setShipments] = useState(sampleData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    // In real implementation, fetch data from API
    // fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/shipments/');
      setShipments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (shipmentId, newStatus) => {
    try {
      // In real implementation, make API call to update status
      const response = await axios.patch(`http://localhost:8000/api/shipments/${shipmentId}/`, {
        status: newStatus
      });
      
      // If order is complete, update driver and vehicle availability
      if (newStatus === 'Delivered') {
        const shipment = shipments.find(s => s.id === shipmentId);
        await axios.patch(`http://localhost:8000/api/drivers/${shipment.assigned_resources.driver.id}/`, {
          status: 'Available'
        });
        await axios.patch(`http://localhost:8000/api/vehicles/${shipment.assigned_resources.vehicle.id}/`, {
          status: 'Available'
        });
      }
      
      fetchShipments();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in transit':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Shipment Tracking</h1>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by Shipment ID, Order ID or Customer..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredShipments.map((shipment) => (
          <Card key={shipment.id} className="shadow-lg">
            <CardHeader className="border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Shipment #{shipment.id}
                  </CardTitle>
                  <p className="text-sm text-gray-500">Order #{shipment.order_id}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>
                  {shipment.status !== 'Delivered' && (
                    <button
                      onClick={() => handleStatusUpdate(shipment.id, 'Delivered')}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="divide-y">
              {/* Customer Information */}
              <div className="py-4">
                <h3 className="font-medium mb-2">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{shipment.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{shipment.customer.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{shipment.customer.address}</p>
                  </div>
                </div>
              </div>

              {/* Pickup and Delivery Details */}
              <div className="py-4">
                <h3 className="font-medium mb-2">Pickup & Delivery Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Pickup Location</p>
                        <p className="font-medium">{shipment.pickup.address}</p>
                        <p className="text-sm text-gray-500">
                          {shipment.pickup.date} at {shipment.pickup.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Delivery Location</p>
                        <p className="font-medium">{shipment.destination.address}</p>
                        <p className="text-sm text-gray-500">
                          Expected: {shipment.destination.expected_date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="py-4">
                <h3 className="font-medium mb-2">Shipment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{shipment.shipment_details.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium">{shipment.shipment_details.dimension}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{shipment.shipment_details.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Special Instructions</p>
                    <p className="font-medium">{shipment.shipment_details.special_instructions}</p>
                  </div>
                </div>
              </div>

              {/* Assigned Resources */}
              <div className="py-4">
                <h3 className="font-medium mb-2">Assigned Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Driver</p>
                      <p className="font-medium">{shipment.assigned_resources.driver.name}</p>
                      <p className="text-sm text-gray-500">ID: {shipment.assigned_resources.driver.id}</p>
                      <p className="text-sm text-gray-500">Contact: {shipment.assigned_resources.driver.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Vehicle</p>
                      <p className="font-medium">{shipment.assigned_resources.vehicle.type}</p>
                      <p className="text-sm text-gray-500">ID: {shipment.assigned_resources.vehicle.id}</p>
                      <p className="text-sm text-gray-500">Capacity: {shipment.assigned_resources.vehicle.capacity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="py-4">
                <h3 className="font-medium mb-2">Tracking Updates</h3>
                <div className="space-y-4">
                  {shipment.tracking_updates.map((update, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium">{update.status}</p>
                        <p className="text-sm text-gray-500">{update.location}</p>
                        <p className="text-sm text-gray-500">{update.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShipmentTracking;
