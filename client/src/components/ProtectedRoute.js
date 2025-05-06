import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => { // children is the component that will be rendered if the user is authenticated
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />; // If the token is present, render the children, otherwise redirect to the login page
};

export default ProtectedRoute;