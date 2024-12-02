import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute(props) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true'? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;