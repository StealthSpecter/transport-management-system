import React from 'react';
import { Truck, Shield, Clock, BarChart2, ChevronRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TransportHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </a>
              <a 
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Fleet with Confidence
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Streamline your transport operations with our comprehensive management system. Track, optimize, and grow your business.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="/register"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">Enterprise-grade security to protect your business data and operations.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor your fleet and shipments in real-time with advanced GPS tracking.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <BarChart2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Comprehensive analytics and reporting tools for better decision making.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to optimize your transport operations?</h2>
          <div className="flex justify-center gap-4">
            <a 
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </a>
            <a 
              href="/register"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
