import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddDriver = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    availability: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/drivers/', formData);
      alert('Driver added successfully!');
      setFormData({ name: '', contact: '', availability: true });
    } catch (error) {
      alert('Error adding driver');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Driver</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.checked})}
              />
              Available
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
