import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectToHomeIfAuthenticated from "./utils/RedirectToHomeIfAuthenticated";

import "./css/style.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "pages/Logout";
import NotFound from "pages/404";
import Signup from "pages/Signup";
export const router = [
  {
    path: "/",
    element: <ProtectedRoute element={<Dashboard />} />,
    title: "Home",
  },
  {
    path: "/login",
    element: <RedirectToHomeIfAuthenticated element={<Login />} />,
    title: "Login",
  },
  {
    path: "/signup",
    element: <Signup />,
    title: "Login",
  },
  {
    path: "/logout",
    element: <ProtectedRoute element={<Logout />} />,
    title: "Logout",
  },
  {
    path: "/users",
    element: <ProtectedRoute />,
    title: "Users",
  },
  {
    path: "/courses",
    element: <ProtectedRoute />,
    title: "Courses",
  },
  {
    path: "/categories",
    element: <ProtectedRoute />,
    title: "Categories",
  },
  {
    path: "/finance",
    element: <ProtectedRoute />,
    title: "Finance",
  },
  {
    path: "/trransactions",
    element: <ProtectedRoute />,
    title: "Transactions",
  },
  {
    path: "/personal-informations",
    element: <ProtectedRoute />,
    title: "Personal Informations",
  },
  {
    path: "/account",
    element: <ProtectedRoute />,
    title: "Account",
  },
];
function App() {
  const location = useLocation();

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.scrollBehavior = "auto";
      window.scroll({ top: 0 });
      html.style.scrollBehavior = "";
    }
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {router.map((route, key) => {
          return <Route key={key} path={route.path} element={route.element} />;
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
