import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import API from "utils/API";
import LessonsModal, { Course } from "components/Courses/Lessons/Modal";
import LessonsTable, { Lesson } from "components/Courses/Lessons/Table";
import { useSearchParams } from "react-router-dom";
import EditLessonsModal from "components/Courses/Lessons/editModal";

const Lessons = () => {
  const [params] = useSearchParams();
  const id = params.get("id")
  const [open, setOpen] = useState<any>();
  const [openEdit, setOpenEdit] = useState<any>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Lesson | null>(null);

  const handleOpenAdd = () => setOpen(true);

  const handleOpenEdit = (lesson: Lesson) => {
    setModalData(lesson);
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalData(null);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setModalData(null);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleClose();
  };
  const handleOpenDelete = (user: any) => {
    setModalData(user);
    setOpenDelete(!openDelete);
  };
  const [lessons, setLessons] = useState<Array<Lesson>>([]);
  const [course, setCourse] = useState<Course | null>(null)
  const { user, notify } = useLayout();
  const _getCourse = (id: any) => {
    API.get(
      `api/courses/${id}`,
      {},
      (data) => {
        setCourse(data?.data)
      },
      () => { },
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    )
  }
  const _fetchData = (id: any) => {
    API.get(
      `api/lessons/lessons_of_course/${id}`,
      {},
      (data) => {
        setLessons(data?.data);
      },
      (e) => { },
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  useEffect(() => {
    if (id) {
      _fetchData(id);
      _getCourse(id)
    }
  }, [id]);
  useEffect(() => {
    // console.log(open, "open");
  }, [open]);

  return (
    <AuthLayout title={"Lessons"}>
      <div className="w-full flex justify-end mt-[10px] mb-[10px] items-end">
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
        handleOpen={handleOpenAdd}
        open={open}
        modalData={modalData}
        _refresh={_fetchData}
        course={course}
      />
      <EditLessonsModal
        handleClose={handleCloseEdit}
        handleOpen={handleOpenEdit}
        open={openEdit}
        modalData={modalData}
        _refresh={_fetchData}
        course={course}
      />
      <LessonsTable
        handleDelete={handleOpenDelete}
        handleOpenEdit={handleOpenEdit}
        lessons={lessons}
        course_id={parseInt(id ?? "0")}
      />
    </AuthLayout>
  );
};
export default Lessons;
