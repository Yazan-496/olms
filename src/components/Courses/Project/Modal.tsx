import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import axios from "axios";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import { useState } from "react";
import API from "utils/API";

interface TransactionsModalProps {
  handleClose: () => void;
  _refresh: (id: any) => void;
  open: boolean;
  modalData?: any;
  id?: any;
  handleOpen: () => void;
}
const ProjectModal = ({
  modalData,
  _refresh,
  handleClose,
  open,
  handleOpen,
  id,
}: TransactionsModalProps) => {
  const { user, notify } = useLayout();

  const [loading, setLoading] = useState(false);
  const [loadingStudens, setLoadingStudens] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: "",
    start_date: "",
    end_date: "",
    course_id: id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(id, "moda");
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await API.post(
        "/api/projects",
        { ...formData, course_id: Number(id) },
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
        _refresh(id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
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
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.data?.file_path) {
        setFormData((prevState) => ({
          ...prevState,
          file: response.data.data.file_path,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoadingFile(false);
    }
  };
  return (
    <Dialog className="z-[999]" open={open} handler={handleOpen}>
      <DialogBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Father Name Field */}
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
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Start Date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="End Date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative w-[150px] h-[150px] group/image  flex items-center justify-center">
              {/* Container for the edit button */}
              <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 rounded-full opacity-100 transition-opacity duration-300">
                <input
                  type="file"
                  onChange={handleUploadFile}
                  className="opacity-0 absolute inset-0 cursor-pointer"
                />
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Upload File
                </div>
              </div>
            </div>
            {loadingFile ? (
              <div className="w-36 flex items-center justify-center border border-black/30 h-36 object-center object-cover rounded-full transition-all duration-500 delay-500 transform">
                Uploading...{" "}
              </div>
            ) : formData.file ? (
              <a
                href={`${import.meta.env.VITE_BASE_URL}${formData.file}`}
                download
                target="_blank"
                title="Download File"
                className="relative w-36 h-36 block"
              >
                <img
                  src={`/images/file.svg`}
                  alt="."
                  className="w-36 h-36 object-center object-cover rounded-full transition-all duration-500 delay-500 transform cursor-pointer"
                />
              </a>
            ) : null}
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

export default ProjectModal;
