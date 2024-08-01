import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLayout } from "layout";
import { LoadingSpinner } from "components/Svgs";
import API from "utils/API";
import Swiper from "components/Swiper";
import HeaderHome from "components/HeaderHome";

const Signup: React.FC = () => {
  const { notify, setUser } = useLayout();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      notify({
        type: "error",
        message: "Passwords do not match",
        timeout: 2000,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await API.post(
        "/api/auth/signup",
        formData,
        (data) => data,
        (e) => {
          notify(e);
        }
      );

      if (response.code === 200) {
        console.log(response);
        setLoading(false);
        setUser(response.data);
        navigate("/dashboard");
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen bg-blue-teal-gradient relative bg-blue-600 overflow-hidden py-4 
items-center"
    >
      <HeaderHome />
      <section className=" px-24 sm:px-8 flex items-center h-full justify-center lg:px-16 xl:px-40 2xl:px-64 ">
        <Swiper />
        <div className=" flex items-center  justify-center h-full w-full dark:bg-gray-950">
          <div className=" bg-white z-20 dark:bg-gray-900 w-[80%] shadow-md rounded-lg px-4 py-3 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
              Create Account
            </h1>
            <form
              className=" grid grid-cols-2 gap-[10px]	"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-rows-2">
                <div className="mb-2 lg:mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2 lg:mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-rows-2">
                <div className="mb-2 lg:mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2 lg:mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-span-2 w-full flex items-center justify-center flex-col">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-teal-gradient relative  bg-blue-teal-gradient relative bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                >
                  {loading ? <LoadingSpinner /> : "Sign Up"}
                </button>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <div
                      onClick={() => navigate("/login")}
                      className="cursor-pointer hover:underline text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Login
                    </div>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
