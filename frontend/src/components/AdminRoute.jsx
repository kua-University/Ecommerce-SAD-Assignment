import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'ROLE_ADMIN') {
    // Redirect to home if authenticated but not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
