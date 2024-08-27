import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import axios from "axios";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import { useEffect, useState } from "react";
import API from "utils/API";

interface CourseModalProps {
  handleClose: () => void;
  _refresh: () => void;
  open: boolean;
  modalData?: any;
  handleOpen: () => void;
}
const CoursesModal = ({
  modalData,
  _refresh,
  handleClose,
  open,
  handleOpen,
}: CourseModalProps) => {
  const { user, notify } = useLayout();

  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    photo_path: "",
    price: null,
    category_id: "",
    user_teacher_id: "",
    started_at: "",
  });
  const _getCategories = async () => {
    try {
      const response = await API.get(
        "/api/categories",
        {},
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
        setCategories(response?.data ?? []);
      } else {
      }
    } catch (err) {}
  };
  const _getTeachers = async () => {
    try {
      const response = await API.get(
        "/api/teachers",
        {},
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
        setTeachers(response?.data ?? []);
      } else {
      }
    } catch (err) {}
  };
  useEffect(() => {
    _getCategories();
    _getTeachers();
  }, []);
  const handleUploadImage = async (e: any) => {
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
        setFormData((prevState: any) => ({
          ...prevState,
          photo_path: response.data.data.file_path,
        }));
      }
    } catch (error) {
      setLoadingFile(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]:
        name === "category_id" || name === "user_teacher_id"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = !formData?.id
        ? await API.post(
            "/api/courses",
            formData,
            (data) => data,
            (e) => {
              notify(e);
            },
            {
              Authorization: `Bearer ${user?.access_token}`,
            }
          )
        : await API.put(
            `/api/courses/${formData?.id}`,
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
        handleClose();
        _refresh();
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const handleButtonClick = () => {
    const input = document.getElementById("photo_path");
    if (input) {
      input.click();
    }
  };

  useEffect(() => {
    if (modalData?.id) {
      setFormData(modalData);
      console.log(modalData, "modalData");
    } else {
      setFormData({
        id: null,
        name: "",
        description: "",
        photo_path: "",
        price: null,
        category_id: "",
        user_teacher_id: "",
        started_at: "",
      });
    }
  }, [modalData, open]);
  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);
  return (
    <Dialog className="z-[999]" open={open} handler={handleOpen}>
      <DialogBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-1">
              <label
                htmlFor="photo_path"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Add Course Photo
              </label>
              <div className="flex items-center justify-center gap-4">
                <input
                  id="photo_path"
                  name="photo_path"
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
                {formData.photo_path && (
                  <img
                    className="w-[50px] h-[50px] object-cover rounded-full"
                    src={`${import.meta.env.VITE_BASE_URL}${
                      formData.photo_path
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
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Father Name"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="started_at"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Started Date
              </label>
              <input
                type="date"
                id="started_at"
                name="started_at"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="10-09-1998"
                value={formData.started_at}
                onChange={handleChange}
                required
              />
            </div>

            {/* National Number Field */}
            <div className="mb-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-1">
            <label
              htmlFor="user_teacher_id"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Teacher
            </label>
            <select
              disabled={false}
              id="user_teacher_id"
              name="user_teacher_id"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.user_teacher_id}
              onChange={handleChange}
              required
            >
              <option value={""}>Please Select Teacher</option>;
              {teachers?.map((teacher: any, i: any) => {
                return (
                  <option key={i} value={teacher?.id}>
                    {teacher?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-1">
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              disabled={false}
              id="category_id"
              name="category_id"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value={""}>Please Select Category</option>;
              {categories?.map((category: any, i: any) => {
                return (
                  <option key={i} value={category?.id}>
                    {category?.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
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
  );
};

export default CoursesModal;
