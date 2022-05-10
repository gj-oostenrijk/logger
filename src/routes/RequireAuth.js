import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to={redirectTo} />;
}
