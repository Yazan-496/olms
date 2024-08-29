import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import API from "utils/API";
import { useParams } from "react-router-dom";
import ProjectModal from "components/Courses/Project/Modal";
import ProjectTable from "components/Courses/Project/Table";

const Project = () => {
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
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState(null);
  const { user, translate } = useLayout();

  const _fetchData = (id: any) => {
    API.get(
      `api/projects_of_course/${id}`,
      {},
      (data) => {
        console.log(data?.data[0]);
        setProject(data?.data[0]);
        if (
          data?.data[0]?.student_projects &&
          data?.data[0]?.student_projects?.length > 0
        ) {
          setProjects(data?.data[0]?.student_projects);
        } else {
        }
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
    <AuthLayout title={translate("project")}>
      <div className="w-full flex justify-end m-4 items-end">
        {!project ? (
          <Button
            variant="text"
            className="border bg-[#fafafa] shadow-lg"
            onClick={handleOpenAdd}
          >
            {translate("new_project")}
          </Button>
        ) : (
          <div className="bg-white p-6 w-full rounded-lg shadow-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {project?.name || "No Project Name"}
            </h2>
            <p className="text-gray-600 mb-4">
              {project?.description || "No description available."}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-700">Start Date:</span>
                <p className="text-gray-900">
                  {project?.start_date || "Not specified"}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">End Date:</span>
                <p className="text-gray-900">
                  {project?.end_date || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4 ">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Students Projects
        </h1>
      </div>
      <ProjectModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open === "add" || open === "edit"}
        modalData={modalData}
        id={id}
        _refresh={_fetchData}
      />
      {
        <ProjectTable
          handleDelete={handleOpenDelete}
          handleOpenEdit={handleOpenEdit}
          projects={projects}
          _refresh={() => _fetchData(id)}
        />
      }
    </AuthLayout>
  );
};
export default Project;
