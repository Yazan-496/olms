import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import "./css/style.css";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import Logout from "pages/Logout";
import NotFound from "pages/404";
import Signup from "pages/Signup";
import HomePage from "pages/home-page";
import Teachers from "pages/Teachers";
import Categories from "pages/Categories";
import Courses from "pages/courses/courses";
import Students from "pages/students";
import Employees from "pages/employees";
import Finance from "pages/financial/finance";
import Transactions from "pages/financial/transactions";
import Profile from "pages/profile/personal-informations";
import CoursesManagment from "pages/courses/courses-managment";
import RegistrationManagment from "pages/courses/registration";
import Lessons from "pages/lessons/index.tsx";
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
    path: "/courses-managment",
    element: <ProtectedRoute element={<CoursesManagment />} />,
    title: "Courses Managment",
  },
  {
    path: "/registration",
    element: <ProtectedRoute element={<RegistrationManagment />} />,
    title: "Registrations",
  },
  {
    path: "/courses/:lesson",
    element: <ProtectedRoute element={<Courses />} />,
    title: "Courses",
  },
  {
    path: "/lessons/:id",
    element: <ProtectedRoute element={<Lessons />} />,
    title: "Lessons",
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
    path: "/financials/finance",
    element: <ProtectedRoute element={<Finance />} />,
    title: "Finance",
  },
  {
    path: "/financials/transactions",
    element: <ProtectedRoute element={<Transactions />} />,
    title: "Transactions",
  },
  {
    path: "/profile/personal-informations",
    element: <ProtectedRoute element={<Profile />} />,
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
