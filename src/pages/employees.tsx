import UsersTable from "components/Users/Employees/Table";
import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import API from "utils/API";
import UserModal from "components/Users/Employees/Modal";
import DeleteDialog from "components/Users/Employees/DeleteDialog";
import CanCall from "utils/ability";
const Employees = () => {
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
  const [users, setUsers] = useState([]);
  const { user, translate } = useLayout();

  const _fetchData = () => {
    API.get(
      "/api/users",
      {},
      (data) => {
        setUsers(data?.data);
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
    <AuthLayout title={translate("employees")}>
      <CanCall permission="CREATE_EMPLOYEE">
        <div className="w-full flex justify-end mt-[10px] mb-[10px] items-end">
          <Button
            variant="text"
            className="border bg-[#fafafa] shadow-lg"
            onClick={handleOpenAdd}
          >
            {translate("add_new_employee")}
          </Button>
        </div>
      </CanCall>
      <UserModal
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
      <UsersTable
        handleDelete={handleOpenDelete}
        handleOpenEdit={handleOpenEdit}
        users={users}
      />
    </AuthLayout>
  );
};
export default Employees;
