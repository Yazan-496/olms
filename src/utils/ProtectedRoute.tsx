// components/ProtectedRoute.tsx
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useLayout } from "layout/index";
import { isAuthenticated } from "utils/isAuthenticated";
import NotFound from "pages/404";

interface ProtectedRouteProps {
  element?: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useLayout();
  if (!element) return <NotFound />;
  return isAuthenticated(user) ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
