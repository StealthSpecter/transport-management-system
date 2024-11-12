import React from 'react';
import { Truck, Users, Calendar, BarChart2, Settings, Search } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TransportHub</span>
            </div>
            <div className="flex items-center">
              <div className="relative mx-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
                <Settings className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Vehicles</p>
                <p className="text-2xl font-semibold text-gray-800">247</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Drivers</p>
                <p className="text-2xl font-semibold text-gray-800">182</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Scheduled Trips</p>
                <p className="text-2xl font-semibold text-gray-800">89</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <BarChart2 className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Performance</p>
                <p className="text-2xl font-semibold text-gray-800">94%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Truck className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Add Vehicle</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Drivers</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Calendar className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Schedule Trip</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <BarChart2 className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">View Reports</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Vehicle TMS-{index + 1}234 started trip</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AnalyticsPage;

