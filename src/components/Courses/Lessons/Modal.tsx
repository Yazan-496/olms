import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import { useEffect, useState } from "react";
import API from "utils/API";

interface TransactionsModalProps {
  handleClose: () => void;
  _refresh: (id: any) => void;
  open: boolean;
  modalData?: any;
  handleOpen: () => void;
}
const LessonsModal = ({
  modalData,
  _refresh,
  handleClose,
  open,
  handleOpen,
}: TransactionsModalProps) => {
  const { user, notify } = useLayout();

  const [loading, setLoading] = useState(false);
  const [loadingStudens, setLoadingStudens] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    user_id: null,
    amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: name === "user_id" ? Number(value) : value,
    }));
  };
  const _getStudents = async () => {
    try {
      setLoadingStudens(true);
      const response = await API.get(
        "/api/students",
        {},
        (data) => data,
        (e) => {
          notify(e);
          setLoadingStudens(false);
        },
        {
          Authorization: `Bearer ${user?.access_token}`,
        }
      );

      if (response.code === 200) {
        console.log(response);
        setStudents(response?.data ?? []);
        setLoadingStudens(false);
      } else {
        setLoadingStudens(false);
      }
    } catch (err) {
      setLoadingStudens(false);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await API.post(
        "/api/financials/deposit_amount",
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
        _refresh(formData?.id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    _getStudents();
  }, []);
  return (
    <Dialog className="z-[999]" open={open} handler={handleOpen}>
      <DialogBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="mb-1">
              <label
                htmlFor="user_id"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Student
              </label>
              <select
                disabled={loadingStudens}
                id="user_id"
                name="user_id"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.user_id}
                onChange={handleChange}
                required
              >
                <option value={""}>Please Select Student</option>;
                {students?.map((student: any, i) => {
                  return (
                    <option key={i} value={student?.id}>
                      {student?.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Father Name Field */}
            <div className="mb-1">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Amount"
                value={formData.amount}
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

export default LessonsModal;
