import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import API from "utils/API";
import LessonsModal from "components/Courses/Lessons/Modal";
import LessonsTable from "components/Courses/Lessons/Table";
import { useParams } from "react-router-dom";

const Lessons = () => {
  const { id } = useParams();
  console.log(id);
  const [open, setOpen] = useState<any>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [modalData, setModalData] = useState(null);

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
  const [lessons, setLessons] = useState([]);
  const { user, notify } = useLayout();

  const _fetchData = (id: any) => {
    API.get(
      `api/lessons/lessons_of_course/${id}`,
      {},
      (data) => {
        setLessons(data?.data);
      },
      (e) => {},
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  useEffect(() => {
    if (id) {
      _fetchData(id);
    }
  }, [id]);
  useEffect(() => {
    // console.log(open, "open");
  }, [open]);

  return (
    <AuthLayout title={"Lessons"}>
      <div className="w-full flex justify-end m-4 items-end">
        <Button
          variant="text"
          className="border bg-[#fafafa] shadow-lg"
          onClick={handleOpenAdd}
        >
          New Lesson
        </Button>
      </div>
      <LessonsModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open === "add" || open === "edit"}
        modalData={modalData}
        _refresh={_fetchData}
      />
      <LessonsTable
        handleDelete={handleOpenDelete}
        handleOpenEdit={handleOpenEdit}
        lessons={lessons}
      />
    </AuthLayout>
  );
};
export default Lessons;
