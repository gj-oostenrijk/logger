import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function RequireAuth({ children, redirectTo }) {
  const { currentUserAuth } = useUserContext();

  return currentUserAuth ? children : <Navigate to={redirectTo} />;
}
