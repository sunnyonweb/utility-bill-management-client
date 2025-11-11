import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "../Component/Loader";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 🔑 If loading, show the spinner (Handles persistent login state on refresh)
  if (loading) {
    return <Loader />;
  }

  // If user is authenticated, render the child component
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login, preserving the attempted route
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
