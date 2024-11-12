// src/layout/Header.js
import React from 'react';
import { FaBell, FaUser, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-800">
            <FaBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Samiksha</span>
            <button className="p-1 rounded-full bg-gray-100">
              <FaUser className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
