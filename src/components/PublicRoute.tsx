import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PublicRoute: React.FC = () => {
  const auth = useAuth();

  return <Outlet />;
};

export default PublicRoute;
