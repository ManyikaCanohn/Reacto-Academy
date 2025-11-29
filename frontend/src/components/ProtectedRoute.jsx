import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

// Protected route for lectures only
export const LectureRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'lecture') {
    return <Navigate to="/login" />;
  }

  return children;
};

// Protected route for students only
export const StudentRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'student') {
    return <Navigate to="/login" />;
  }

  return children;
};