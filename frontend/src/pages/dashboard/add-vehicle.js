import React, { useState } from 'react';
import axios from 'axios';

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicleNumber: '',
    type: 'truck',
    capacity: '',
    status: 'available'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:8000/add-vehicle', vehicleData);
      alert('Vehicle added successfully!');
      // Reset form
      setVehicleData({
        vehicleNumber: '',
        type: 'truck',
        capacity: '',
        status: 'available'
      });
    } catch (error) {
      if (err.response && err.response.data) {
        setError('Failed to add vehicle: ' + JSON.stringify(err.response.data));
      } else {
        setError('Error adding vehicle. Please try again.');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Vehicle</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {success && <div className="text-green-600 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                value={vehicleData.vehicleNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter vehicle number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Type</label>
              <select
                name="type"
                value={vehicleData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Capacity (in tons)</label>
              <input
                type="number"
                name="capacity"
                value={vehicleData.capacity}
                onChange={handleInputChange}
                required
                placeholder="Enter capacity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                name="status"
                value={vehicleData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="available">Available</option>
                <option value="in_maintenance">In Maintenance</option>
                <option value="on_trip">On Trip</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Vehicle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
