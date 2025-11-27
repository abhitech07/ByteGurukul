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
    // Assuming user.role is stored as 'Admin', 'Instructor', 'Student' etc.
    // Normalize to lowercase for comparison if needed, or ensure strictly matching strings
    const userRole = user.role; 
    
    if (!allowedRoles.includes(userRole)) {
      // User authorized but not for this role -> redirect to dashboard or home
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;