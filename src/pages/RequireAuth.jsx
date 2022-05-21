import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useUserContext();

  return currentUser ? children : <Navigate to={redirectTo} />;
}
