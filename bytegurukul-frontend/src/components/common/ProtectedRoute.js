import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper Spinner component
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check for role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role;

    // Case-insensitive role check
    if (!allowedRoles.some(role => role.toLowerCase() === userRole.toLowerCase())) {
      // User authorized but not for this role -> redirect to dashboard or home
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;