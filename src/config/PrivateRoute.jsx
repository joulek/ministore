import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const location = useLocation();

  // Vérifie existence de session
  if (!token || !role) {
    return <Navigate to="/log" replace />;
  }

  // Vérifie autorisation
  if (role === 'ADMIN' && location.pathname.startsWith('/admin')) {
    return <Outlet />;
  }

  if (role === 'CLIENT' && location.pathname.startsWith('/client')) {
    return <Outlet />;
  }

  // Accès refusé
  return <Navigate to="/notfound" replace />;
};

export default PrivateRoutes;
