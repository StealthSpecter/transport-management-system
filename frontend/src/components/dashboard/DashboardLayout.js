import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import { StatCard } from './cards/StatCard';
import OrderSummaryCard from './cards/OrderSummaryCard';
import { OrdersChart } from './charts/OrdersChart';
import RecentOrdersTable from './tables/RecentOrdersTable';
import { FaBox, FaSpinner } from 'react-icons/fa';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DashboardLayout = () => {
  const [orderSummary, setOrderSummary] = useState(null);
  const [recentOrders, setRecentOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching with mock data
    const mockData = {
      orderSummary: {
        completedOrders: 150,
        pendingOrders: 30,
        totalSales: 5000
      },
      recentOrders: [
        { orderId: 1, customerName: 'Samiksha', status: 'Completed' },
        { orderId: 2, customerName: 'Siddhant', status: 'Pending' },
        { orderId: 3, customerName: 'Binjraj', status: 'Completed' }
      ]
    };

    setTimeout(() => {
      setOrderSummary(mockData.orderSummary);
      setRecentOrders(mockData.recentOrders);
      setLoading(false);
    }, 1000); // Delay to simulate fetching
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />

          {/* Error Handling */}
          {error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="dashboard-layout">
              {/* Order Summary and Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                <StatCard
                  title="Total Orders"
                  value={orderSummary?.completedOrders || '0'}
                  icon={FaBox}
                  description="Total number of orders this week"
                />
                <OrderSummaryCard order={orderSummary} />
              </div>

              {/* Orders Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <OrdersChart />
              </div>

              {/* Recent Orders Table */}
              {recentOrders && recentOrders.length > 0 ? (
                <RecentOrdersTable orders={recentOrders} />
              ) : (
                <p className="text-center text-gray-600">No recent orders available.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

