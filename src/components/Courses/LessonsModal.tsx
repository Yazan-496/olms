import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import axios from "axios";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import { useEffect, useState } from "react";
import API from "utils/API";

const days = [
  { id: 0, name: "Sunday" },
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
];
interface CourseModalProps {
  handleClose: () => void;
  _refresh: () => void;
  open: boolean;
  modalData?: any;
  handleOpen: (course: any) => void;
}
interface Session {
  time: string;
  max_capacity: any;
  date: string;
  duaration: any;
  section_id: any;
}
interface FormData {
  course_id: any;
  name: string;
  description: string;
  file: string;
  sessions: Session[];
}
const LessonsOfCourse = ({
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
  const [formData, setFormData] = useState<FormData>({
    course_id: null,
    name: "",
    description: "",
    file: "",
    sessions: [
      {
        time: "",
        max_capacity: null,
        date: "",
        duaration: null,
        section_id: null,
      },
    ],
  });

  const handleAddSession = () => {
    setFormData((prevState) => ({
      ...prevState,
      sections: [
        ...prevState.sessions,
        {
          time: "",
          max_capacity: null,
          date: "",
          duaration: null,
          section_id: null,
        },
      ],
    }));
  };

  const handleRemoveSession = (index: number) => {
    setFormData((prevState) => {
      const updatedSessions = prevState.sessions.filter((_, i) => i !== index);
      return {
        ...prevState,
        sections: updatedSessions,
      };
    });
  };

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
      const response = !formData?.course_id
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
            `/api/courses/${formData?.course_id}`,
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
        // console.log(response);
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
    } else {
      setFormData({
        course_id: null,
        name: "",
        description: "",
        file: "",
        sessions: [
          {
            time: "",
            max_capacity: null,
            date: "",
            duaration: null,
            section_id: null,
          },
        ],
      });
    }
  }, [modalData, open]);
  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);
  return (
    <Dialog className="z-[999]" open={open} handler={handleOpen}>
      <DialogBody className="max-h-[80vh] overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              htmlFor="name"
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

export default LessonsOfCourse;
