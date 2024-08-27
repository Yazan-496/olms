import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import API from "utils/API";
import CoursesModal from "components/Courses/Modal";
import DeleteDialog from "components/Courses/DeleteDialog";
import CoursesTable from "components/Courses/Table";
const CoursesManagment = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = useState<any>();

  const handleOpenAdd = () => setOpen("add");
  const handleOpenEdit = (user: any) => {
    setModalData(user);
    setOpen("edit");
  };
  const handleClose = () => {
    setOpen("");
    setModalData(null);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleClose();
  };
  const handleOpen = () => {
    if (open === "add" || open === "edit") {
      setOpen(false);
      handleClose();
    } else {
      handleOpenAdd();
    }
  };
  const handleOpenDelete = (user: any) => {
    setModalData(user);
    setOpenDelete(!openDelete);
  };
  const [courses, setUsers] = useState([]);
  const { user, notify } = useLayout();

  const _fetchData = () => {
    API.get(
      "/api/courses",
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
  useEffect(() => {
    // console.log(open, "open");
  }, [open]);

  return (
    <AuthLayout title={"Courses Managment"}>
      <div className="w-full flex justify-end m-4 items-end">
        <Button
          variant="text"
          className="border bg-[#fafafa] shadow-lg"
          onClick={handleOpenAdd}
        >
          Add New Course
        </Button>
      </div>
      <CoursesModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open === "add" || open === "edit"}
        modalData={modalData}
        _refresh={_fetchData}
      />
      <DeleteDialog
        handleClose={handleCloseDelete}
        handleOpen={() => setOpenDelete(false)}
        open={openDelete}
        modalData={modalData}
        _refresh={_fetchData}
      />
      <CoursesTable
        handleDelete={handleOpenDelete}
        handleOpenEdit={handleOpenEdit}
        courses={courses}
      />
    </AuthLayout>
  );
};
export default CoursesManagment;
