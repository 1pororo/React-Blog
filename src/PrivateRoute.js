import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ element, redirect, ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? element : <Navigate to={redirect} replace={true} />;
}
