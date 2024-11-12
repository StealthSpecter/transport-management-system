// src/layout/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: FaHome, name: 'Dashboard', path: '/dashboard' }, // Updated to the dashboard base path
    { icon: FaBox, name: 'Orders', path: '/dashboard/orders' }, // Updated to match the nested route
    { icon: FaUsers, name: 'Customers', path: '/dashboard/customers' }, // Updated to match the nested route
    { icon: FaChartBar, name: 'Analytics', path: '/dashboard/analytics' }, // Updated to match the nested route
    { icon: FaCog, name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
        
      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center space-x-3 text-gray-300 hover:text-white w-full px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

