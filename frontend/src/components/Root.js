import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Root = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Protect dashboard routes
  if (location.pathname.startsWith('/dashboard') && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect authenticated users from auth pages to dashboard
  if (user && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default Root;
