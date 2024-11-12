import React, { useState } from 'react';
import axios from 'axios';

const AddOrder = () => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerContact: '',
    customerAddress: '',
    pickupLocation: '',
    destination: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/orders/create/', orderData);
      alert('Order created successfully!');
      // Reset form
      setOrderData({
        customerName: '',
        customerContact: '',
        customerAddress: '',
        pickupLocation: '',
        destination: '',
        date: '',
      });
    } catch (error) {
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Order</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={orderData.customerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter customer name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact</label>
                <input
                  type="tel"
                  name="customerContact"
                  value={orderData.customerContact}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter contact number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="customerAddress"
                  value={orderData.customerAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={orderData.pickupLocation}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter pickup location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={orderData.destination}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter destination"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={orderData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
