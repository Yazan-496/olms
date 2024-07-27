import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useLayout } from "layout";
import { isAuthenticated } from "utils/isAuthenticated";

interface RedirectToHomeIfAuthenticatedProps {
  element: ReactElement;
}

const RedirectToHomeIfAuthenticated: React.FC<
  RedirectToHomeIfAuthenticatedProps
> = ({ element }) => {
  const { user } = useLayout();

  return isAuthenticated(user) ? <Navigate to="/" /> : element;
};

export default RedirectToHomeIfAuthenticated;
