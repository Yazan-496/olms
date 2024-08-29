import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import { useEffect, useState } from "react";
import API from "utils/API";

interface CategoryModalProps {
  handleClose: () => void;
  _refresh: () => void;
  open: boolean;
  modalData?: any;
  handleOpen: () => void;
}
const CategoryModal = ({
  modalData,
  _refresh,
  handleClose,
  open,
  handleOpen,
}: CategoryModalProps) => {
  const { user, notify } = useLayout();

  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = !formData?.id
        ? await API.post(
          "/api/categories",
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
          `/api/categories/${formData?.id}`,
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

  useEffect(() => {
    if (modalData?.id) {
      setFormData(modalData);
      console.log(modalData, "modalData");
    } else {
      setFormData({
        id: null,
        name: "",
        description: ""
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

            {/* description Field */}
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

export default CategoryModal;
