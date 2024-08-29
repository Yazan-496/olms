import { Button } from "@material-tailwind/react";
import DeleteDialog from "components/category/DeleteDialog";
import CategoryModal from "components/category/Modal";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CanCall from "utils/ability";
import API from "utils/API";

const Categories = () => {
  const { user, translate } = useLayout();
  const { course, lesson } = useParams();
  const [open, setOpen] = useState<any>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [modalData, setModalData] = useState(null);
  console.log(course, lesson, "course, lesson");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const _fetchData = () => {
    setLoading(true);
    API.get(
      "/api/categories",
      {},
      (data) => {
        setLoading(false);
        setCategories(data?.data);
      },
      (e) => {
        setLoading(false);
      },
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
    setLoading(false);
  };

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
  useEffect(() => {
    _fetchData();
  }, []);
  return (
    <AuthLayout title={translate("categories")}>
      <CanCall permission="CREATE_CATEGORY">
        <div className="w-full flex justify-end mt-[10px] mb-[10px] items-end">
          <Button
            variant="text"
            className="border bg-[#fafafa] shadow-lg"
            onClick={handleOpenAdd}
          >
            {translate("add_new_category")}
          </Button>
        </div>
      </CanCall>
      {loading && (
        <span className=" z-10 w-full flex items-center justify-center p-10">
          <LoadingSpinner />
        </span>
      )}
      <CategoryModal
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
      <div className="grid grid-cols-3 gap-10">
        {categories?.map((cate: any, i: number) => {
          return (
            <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{cate?.name}</div>
                <p className="text-gray-700 text-base">{cate?.description}</p>
              </div>
              <div className="flex flex-row justify-between w-[100px] ml-[1.5rem]">
                <CanCall permission="UPDATE_CATEGORY">
                  <a
                    onClick={() => handleOpenEdit(cate)}
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </CanCall>
                <CanCall permission="DELETE_CATEGORY">
                  <a
                    onClick={() => handleOpenDelete(cate)}
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </CanCall>
              </div>
              <div className="px-6 pt-4 pb-2">
                {cate?.courses?.slice(0, 3)?.map((course: any, ii: number) => {
                  return (
                    <NavLink to="/courses">
                      <span
                        key={ii}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        #{course?.name}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AuthLayout>
  );
};

export default Categories;
