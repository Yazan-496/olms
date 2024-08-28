import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import { useEffect, useState } from "react";
import API from "utils/API";
import { toISO8601WithoutSeconds } from "utils/Utils";

interface RegistrationModalProps {
  handleClose: () => void;
  _refresh: () => void;
  open: boolean;
  modalData?: any;
  handleOpen: () => void;
}
const RegistrationModal = ({
  modalData,
  _refresh,
  handleClose,
  open,
  handleOpen,
}: RegistrationModalProps) => {
  const { user, notify } = useLayout();

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    courses: [] as string[],
    started_at: "",
    end_at: "",
  });
  const _getCourses = async () => {
    try {
      const response = await API.get(
        "/api/courses",
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
        setCourses(response?.data ?? []);
      } else {
      }
    } catch (err) {}
  };
  useEffect(() => {
    _getCourses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | any>
  ) => {
    const { name, type, value, options } = e.target;
    console.log({ name, type, value, options });
    if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option: any) => option.selected)
        .map((option: any) => option.value);

      setFormData((prevState: any) => {
        let updatedCourses = [...prevState[name]];

        selectedValues.forEach((value) => {
          if (updatedCourses.includes(value)) {
            updatedCourses = updatedCourses.filter(
              (course) => course !== value
            );
          } else {
            updatedCourses.push(Number(value));
          }
        });

        return {
          ...prevState,
          [name]: updatedCourses,
        };
      });
    } else {
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = !formData?.id
        ? await API.post(
            "/api/registerations",
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
            `/api/registerations/${formData?.id}`,
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
      console.log(
        modalData.started_at,
        toISO8601WithoutSeconds(modalData.end_at),
        "sjhgshag"
      );
      setFormData((prevState: any) => ({
        ...prevState,
        id: modalData?.id,
        started_at: toISO8601WithoutSeconds(modalData.started_at),
        end_at: toISO8601WithoutSeconds(modalData.end_at),
        courses: modalData.courses.map((course: any) => course.id),
      }));
      console.log(modalData, "modalData");
    } else {
      setFormData({
        id: null,
        courses: [] as string[],
        started_at: "",
        end_at: "",
      });
    }
  }, [modalData, open]);
  useEffect(() => {}, [formData]);
  return (
    <Dialog className="z-[999]" open={open} handler={handleOpen}>
      <DialogBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-1">
            <div className="mb-1">
              <label
                htmlFor="started_at"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Started Date
              </label>
              <input
                type="datetime-local"
                id="started_at"
                name="started_at"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="10-09-1998"
                value={formData.started_at}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="end_at"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Ended Date
              </label>
              <input
                type="datetime-local"
                id="end_at"
                name="end_at"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="10-09-1998"
                value={formData.end_at}
                onChange={handleChange}
                required
              />
            </div>
            <label
              htmlFor="courses"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Courses
            </label>
            <select
              multiple
              disabled={false}
              id="courses"
              name="courses"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.courses}
              onChange={handleChange}
              required
            >
              <option disabled value={""}>
                Please Select Courses
              </option>
              ;
              {courses?.map((course: any, i: any) => {
                return (
                  <option key={i} value={course?.id}>
                    {course?.name}
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

export default RegistrationModal;
