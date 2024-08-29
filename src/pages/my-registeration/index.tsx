import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import API from "utils/API";
import { Course } from "components/Courses/Lessons/Modal";
import { Lesson } from "components/Courses/Lessons/Table";
import { useSearchParams } from "react-router-dom";
import MyRegisterationsTable from "components/Courses/MyRegisterations/Table";

const MyRegisteratoins = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
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
  const handleOpenDelete = (user: any) => {
    setModalData(user);
    setOpenDelete(!openDelete);
  };
  const [registerations, setRegisterations] = useState<Array<any>>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const { user, translate } = useLayout();

  const _fetchData = () => {
    API.post(
      `api/student_registeration/my_registeration`,
      {},
      (data) => {
        setRegisterations(data?.data);
      },
      (e) => { },
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
    <AuthLayout title={translate("my_registerations")}>
      <MyRegisterationsTable
        handleDelete={handleOpenDelete}
        handleOpenEdit={handleOpenEdit}
        myregisterations={registerations}
      />
    </AuthLayout>
  );
};
export default MyRegisteratoins;
