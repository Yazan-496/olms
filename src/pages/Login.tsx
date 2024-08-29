import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLayout } from "layout";
import { LoadingSpinner } from "components/Svgs";
import API from "utils/API";
import SwiperComponent from "components/Swiper";
import HeaderHome from "components/HeaderHome";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false); //

  const { notify, setUser, translate } = useLayout();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await API.post(
        "/api/auth/login",
        formData,
        (data) => data,
        (e) => {
          notify(e);
        }
      );

      console.log(response);
      if (response.code === 200) {
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
      <section className="flex-grow h-full px-24 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 flex items-center justify-center">
        <SwiperComponent />
        <div className="h-full flex items-center justify-center w-full dark:bg-gray-950">
          <div className="bg-white z-20 relative dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
              {translate("welcome_back")}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {translate("email_address")}
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
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {translate("password")}
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
                <a
                  href="#"
                  className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {translate("forgot_password")}
                </a>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    {translate("remember_me")}

                  </label>
                </div>
                <div
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer  hover:underline text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {translate("create_account")}

                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-teal-gradient relative bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
              >
                {loading ? <LoadingSpinner /> : translate("login")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
