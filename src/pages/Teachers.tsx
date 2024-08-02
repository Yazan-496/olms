import UsersTable from "components/Users/Table";
import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import API from "utils/API";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "components/Svgs";
import axios from "axios";
const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [users, setUsers] = useState([]);
  const { user, notify } = useLayout();

  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    mother_name: "",
    email: "",
    personal_picture: "",
    national_number: "",
    central_number: "",
    birth_date: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleUploadImage = async (e: { target: { files: any[] } }) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);
    try {
      setLoadingFile(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/upload_file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response, "response");
      if (response.data?.data?.file_path) {
        setLoadingFile(false);
        setFormData((prevState) => ({
          ...prevState,
          personal_picture: response.data.data.file_path,
        }));
      }
    } catch (error) {
      setLoadingFile(false);
    }
  };
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
        "/api/teachers",
        formData,
        (data) => data,
        (e) => {
          notify(e);
        },
        {
          Authorization: `Bearer ${user?.access_token}`,
        }
      );

      if (response.code === 200) {
        console.log(response);
        setLoading(false);
        setOpen(false);
        _fetchData();
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const _fetchData = () => {
    API.get(
      "/api/teachers",
      {},
      (data) => {
        setUsers(data?.data);
      },
      (e) => {},
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  useEffect(() => {
    _fetchData();
  }, []);
  const handleButtonClick = () => {
    const input = document.getElementById("personal_picture");
    if (input) {
      input.click();
    }
  };
  return (
    <AuthLayout title={"Teachers"}>
      <div className="w-full flex justify-end m-4 items-end">
        <Button
          variant="text"
          className="border bg-[#fafafa] shadow-lg"
          onClick={handleOpen}
        >
          Add New Teacher
        </Button>
      </div>
      <Dialog className="z-[999]" open={open} handler={handleOpen}>
        <DialogBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-1">
                <label
                  htmlFor="personal_picture"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Add Profile Photo
                </label>
                <div className="flex items-center justify-center gap-4">
                  <input
                    id="personal_picture"
                    name="personal_picture"
                    type="file"
                    className="hidden"
                    onChange={handleUploadImage}
                  />
                  <button
                    disabled={loadingFile}
                    type="button"
                    onClick={handleButtonClick}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                  >
                    {loadingFile ? "Uploading..." : "Upload"}
                  </button>
                  {formData.personal_picture && (
                    <img
                      className="w-[50px] h-[50px] object-cover rounded-full"
                      src={`${import.meta.env.VITE_BASE_URL}${
                        formData.personal_picture
                      }`}
                      alt="Selected"
                    />
                  )}
                </div>
              </div>
              {/* Name Field */}
              <div className="mb-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Father Name Field */}
              <div className="mb-1">
                <label
                  htmlFor="father_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Father Name
                </label>
                <input
                  type="text"
                  id="father_name"
                  name="father_name"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Father Name"
                  value={formData.father_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Mother Name Field */}
              <div className="mb-1">
                <label
                  htmlFor="mother_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Mother Name
                </label>
                <input
                  type="text"
                  id="mother_name"
                  name="mother_name"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Mother Name"
                  value={formData.mother_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-1">
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
              <div className="mb-1">
                <label
                  htmlFor="birth_date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="10-09-1998"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Central Number Field */}
              <div className="mb-1">
                <label
                  htmlFor="central_number"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Central Number
                </label>
                <input
                  type="text"
                  id="central_number"
                  name="central_number"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder=""
                  value={formData.central_number}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* National Number Field */}
              <div className="mb-1">
                <label
                  htmlFor="national_number"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  National Number
                </label>
                <input
                  type="number"
                  id="national_number"
                  name="national_number"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder=""
                  value={formData.national_number}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-1">
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

              {/* Confirm Password Field */}
              <div className="mb-1">
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

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <button
                disabled={loading}
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
              >
                {loading ? <LoadingSpinner /> : "Save"}
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
      <UsersTable users={users} />
    </AuthLayout>
  );
};
export default Teachers;
