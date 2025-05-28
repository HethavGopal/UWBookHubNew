import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({children}) => {
  const { currentUser } = useAuth();
  const token = localStorage.getItem('token');

  if (!token || !currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children ? children : <Outlet />;
}

export default AdminRoute