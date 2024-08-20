import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import "./css/style.css";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Logout from "pages/logout";
import NotFound from "pages/404";
import Signup from "pages/signup";
import HomePage from "pages/home-page";
import Teachers from "pages/teachers";
import Categories from "pages/categories";
import Courses from "pages/courses";
import Students from "pages/students";
import Employees from "pages/employees";
export const router = [
  {
    path: "/",
    element: <HomePage />,
    title: "Home",
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
    title: "Dashboard",
  },
  {
    path: "/login",
    element: <Login />,
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
    path: "/teachers",
    element: <ProtectedRoute element={<Teachers />} />,
    title: "Teachers",
  },
  {
    path: "/employees",
    element: <ProtectedRoute element={<Employees />} />,
    title: "employees",
  },
  {
    path: "/students",
    element: <ProtectedRoute element={<Students />} />,
    title: "Students",
  },
  {
    path: "/courses",
    element: <ProtectedRoute element={<Courses />} />,
    title: "Courses",
  },
  {
    path: "/courses/:lesson",
    element: <ProtectedRoute element={<Courses />} />,
    title: "Courses",
  },
  {
    path: "/categories/:course",
    element: <ProtectedRoute element={<Categories />} />,
    title: "Categories",
  },
  {
    path: "/categories/:course/:lesson",
    element: <ProtectedRoute element={<Categories />} />,
    title: "Categories",
  },
  {
    path: "/categories/",
    element: <ProtectedRoute element={<Categories />} />,
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
