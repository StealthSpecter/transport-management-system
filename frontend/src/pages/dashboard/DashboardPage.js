import React, { useEffect, useState } from 'react';
import { Package, Truck, Users, Clock } from 'lucide-react';
import { StatCard } from '../../components/dashboard/cards/StatCard';
import { OrdersChart } from '../../components/dashboard/charts/OrdersChart';
import  RecentOrdersTable  from '../../components/dashboard/tables/RecentOrdersTable';
// eslint-disable-next-line no-unused-vars
const setDashboardData = (data) => {};

export const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: [
      {
        title: "Total Orders",
        value: "256",
        icon: Package,
        description: "+20% from last month"
      },
      {
        title: "Active Shipments",
        value: "45",
        icon: Truck,
        description: "12 arriving today"
      },
      {
        title: "Customers",
        value: "128",
        icon: Users,
        description: "+5 this week"
      },
      {
        title: "Average Delivery Time",
        value: "24h",
        icon: Clock,
        description: "2h faster than last month"
      }
    ],
    recentOrders: [
      { id: 1, customer: "Samiksha", status: "In Transit", destination: "New York", date: "2024-11-10" },
      { id: 2, customer: "Siddhant", status: "Delivered", destination: "Los Angeles", date: "2024-11-09" }
    ],
    chartData: [
      { name: 'Jan', orders: 65 },
      { name: 'Feb', orders: 59 },
      { name: 'Mar', orders: 80 },
      { name: 'Apr', orders: 81 },
      { name: 'May', orders: 56 },
      { name: 'Jun', orders: 55 }
    ]
  });

 useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with actual API call
        // const data = await orderService.getDashboardData();
        // setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
        
    fetchDashboardData();
  }, []);
       
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <OrdersChart data={dashboardData.chartData} />
        <RecentOrdersTable orders={dashboardData.recentOrders} />
      </div>
    </div>
  ); 
};
