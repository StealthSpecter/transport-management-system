import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import HomePage from './pages/Home';
import LoginPage from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import OrdersPage from './pages/dashboard/OrdersPage';
import CustomersPage from './pages/dashboard/CustomersPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import AddOrder from './pages/dashboard/add-order';
import ShipmentTracking from './pages/dashboard/shipment-tracking';
import AddDriver from './pages/dashboard/add-driver';
import AddVehicle from './pages/dashboard/add-vehicle';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && (location.pathname === '/login' || location.pathname === '/register')) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return children;
};

function AppRoutes() {
  const { loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      console.log('Ensuring home page load');
    }
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }
      />
  
      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
  
      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="add-order" element={<AddOrder />} />
        <Route path="shipment-tracking" element={<ShipmentTracking />} />
        <Route path="add-driver" element={<AddDriver />} />
        <Route path="add-vehicle" element={<AddVehicle />} />
      </Route>
         
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
        
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
          
export default App;
