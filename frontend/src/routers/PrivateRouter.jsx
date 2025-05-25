import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRouter = ({children}) => {
  const {currentUser} = useAuth();
  if(currentUser){
    return children;    
  }    
  return <Navigate to="/login" replace />
  
}

export default PrivateRouter