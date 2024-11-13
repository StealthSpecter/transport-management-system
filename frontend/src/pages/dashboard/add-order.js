import React, { useState } from 'react';
import axios from 'axios';

const AddOrder = () => {
  const [orderData, setOrderData] = useState({
    customerEmail: '',
    weight: '',
    dimensions: '',
    o_pickup: '',
    o_destination: '',
    date: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/add-orders', orderData);
      setSuccess(`Order created successfully! Order ID: ${response.data.order_id}`);
      setOrderData({
        customerEmail: '',
        weight: '',
        dimensions: '',
        o_pickup: '',
        o_destination: '',
        date: '',
      });
    } catch (err) {
      setError('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Order</h2>
          {error && <Alert variant="destructive">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Email</label>
                <input
                  type="text"
                  name="customerName"
                  value={orderData.customerEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter customer email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={orderData.o_pickup}
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
                  value={orderData.o_destination}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter destination"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={orderData.weight}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Dimensions (LxWxH)</label>
                <input
                  type="text"
                  name="dimensions"
                  value={orderData.dimensions}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 10x10x10"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
