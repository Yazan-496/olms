import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import API from "utils/API";
import FinancesModal from "components/Financial/Finance/Modal";
import FinancesTable from "components/Financial/Finance/Table";

const Finance = () => {
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
  const [finances, setFinances] = useState([]);
  const { user, translate } = useLayout();

  const _fetchData = () => {
    API.get(
      "/api/financials",
      {},
      (data) => {
        setFinances(data?.data);
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
    <AuthLayout title={translate("finance")}>
      <div className="w-full flex justify-end mt-[10px] mb-[10px] items-end">
        <Button
          variant="text"
          className="border bg-[#fafafa] shadow-lg"
          onClick={handleOpenAdd}
        >
          {translate("new_deposit")}

        </Button>
      </div>
      <FinancesModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open === "add" || open === "edit"}
        modalData={modalData}
        _refresh={_fetchData}
      />
      <FinancesTable
        handleDelete={handleOpenDelete}
        handleOpenEdit={handleOpenEdit}
        finances={finances}
      />
    </AuthLayout>
  );
};
export default Finance;
