import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/dashboard${path}`;
  };

  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4">
        <h1 className="text-xl font-bold">Transport System</h1>
      </div>
      <nav className="mt-4">
        <Link
          to="/dashboard"
          className={`block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 
            ${isActive('') ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="/dashboard/orders"
          className={`block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 
            ${isActive('/orders') ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          Orders
        </Link>
        <Link
          to="/dashboard/customers"
          className={`block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 
            ${isActive('/customers') ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          Customers
        </Link>
        <Link
          to="/dashboard/add-order"
          className={`block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 
            ${isActive('/add-order') ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          Add Order
        </Link>
        <Link
          to="/dashboard/shipment-tracking"
          className={`block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 
            ${isActive('/shipment-tracking') ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          Shipment Tracking
        </Link>
        <Link
          to="/dashboard/add-driver"
          className={`block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 
            ${isActive('/add-driver') ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          Add Driver
        </Link>
        <Link
          to="/dashboard/add-vehicle"
          className={`block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 
            ${isActive('/add-vehicle') ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          Add Vehicle
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
