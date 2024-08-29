import { Dialog, DialogBody } from "@material-tailwind/react";
import axios from "axios";
import { useLayout } from "layout";
import { useState } from "react";
import API from "utils/API";

export default function MyRegisterationsTable({
  handleOpenEdit,
  handleDelete,
  myregisterations,
}: {
  myregisterations: any;
  handleOpenEdit: (user: any) => void;
  handleDelete: (user: any) => void;
}) {
  const { translate } = useLayout();
  const TABLE_HEAD = [
    "ID",
    "Photo",
    "Course Name",
    "Course Description",
    "price",
    "Details",
    "Degree",
  ];
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileUploaded, setFile] = useState(null);
  const [desc, setDesc] = useState<any>(null);
  const handleUploadFile = async (e: any) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);
    try {
      setLoadingFile(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/upload_file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response, "response");
      if (response.data?.data?.file_path) {
        setLoadingFile(false);
        setFile(response.data.data.file_path);
      }
    } catch (error) {
      setLoadingFile(false);
    }
  };
  const { user, notify } = useLayout();
  const [course, setCourse] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const _getCourse = (id: any) => {
    API.get(
      `api/courses/${id}`,
      {},
      (data) => {
        setOpenModal(true);
        setCourse(data?.data);
      },
      () => {},
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(!openModal);
  };
  const _openIframe = () => {
    setOpenIframe((prev) => {
      return {
        ...prev,
        show: !prev.show,
      };
    });
  };

  const [openIframe, setOpenIframe] = useState({ show: false, url: "" });
  const handleOpenIframe = (url: any) => {
    // setOpenIframe({ show: true, url: url });
  };
  const attend = (lesson_id: any) => {
    API.get(
      `/api/lesson/attend_lesson/${lesson_id}`,
      {},
      (data) => data,
      (e) => {},
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  const handleSave = (project_id: any) => {
    API.post(
      `/api/create_student_project`,
      {
        description: desc,
        project_id: project_id,
        file: fileUploaded,
      },
      (data) => {
        data;
        notify({
          type: "success",
          message: "Project Upload Successfully",
          timeout: 2000,
        });
      },
      (e) => {},
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 w-fulluppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className=" ">
              {TABLE_HEAD.map((head, index) => (
                <th key={index} scope="col" className="text-center px-6 py-3">
                  <div className="flex text-center justify-start items-center">
                    {head}
                    {index > 0 && (
                      <a href="#">
                        <svg
                          className="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {myregisterations?.length > 0 ? (
            <tbody className="w-full">
              {myregisterations?.map((transaction: any, index: number) => (
                <tr
                  key={index}
                  className={`bg-white border-b !w-full dark:bg-gray-800 dark:border-gray-700 ${
                    index % 2 === 0 ? "" : "bg-gray-50"
                  }`}
                >
                  {" "}
                  <td className="px-6 py-4  text-start">
                    {transaction?.course?.id}
                  </td>
                  <td className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white flex items-center space-x-2">
                    {transaction?.course?.photo_path && (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${
                          transaction?.course?.photo_path
                        }`}
                        alt={transaction.course?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4  text-start">
                    {transaction?.course?.name}
                  </td>
                  <td className="px-6 py-4  text-start">
                    {transaction?.course?.description}
                  </td>
                  <td className="px-6 py-4 text-start">
                    {transaction.course?.price}
                  </td>
                  <td className="px-6 py-4 cursor-pointer hover:text-blue-500 text-start">
                    <div onClick={() => _getCourse(transaction?.course?.id)}>
                      Show Details
                    </div>
                  </td>
                  <td className="px-6 py-4 text-start">
                    {transaction.course?.degree}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>

      {openModal && (
        <Dialog
          className="z-[999]"
          open={openModal}
          handler={handleOpen}
          style={{
            maxWidth: "90%",
            minWidth: "60%",
          }}
        >
          <DialogBody>
            <div className="mt-[10px] mb-[10px]">
              <div className="text-[#2f4880] w-full text-start">
                Course Project
              </div>
              <div
                className={`w-full flex items-center justify-between text-center 
                    shadow-sm p-[5px] m-[5px] border-[1px] 
                    rounded-[10px]
                      `}
              >
                <div className="text-[#2f4880] text-start">
                  {course?.project?.name}
                </div>
                <div className="text-[#2f4880] text-start">
                  {course?.project?.description}
                </div>
                <div className="text-[#2f4880] text-start">
                  Started Date:{course?.project?.start_date}
                </div>
                <div className="text-[#2f4880] text-start">
                  Ended Date:{course?.project?.end_date}
                </div>
                <a
                  href={`${import.meta.env.VITE_BASE_URL}${
                    course?.project?.file
                  }`}
                  download
                  target="_blank"
                  title="Download File"
                  className="relative w-12 h-12 block"
                >
                  <img
                    src={`/images/file.svg`}
                    alt="."
                    className="w-12 h-12 object-center object-cover rounded-full transition-all duration-500 delay-500 transform cursor-pointer"
                  />
                </a>
              </div>
              <div className="relative w-full h-[150px] group/image  flex items-center justify-between">
                {/* Container for the edit button */}
                <input
                  type="text"
                  placeholder="Description"
                  onChange={(e) => setDesc(e?.target?.value)}
                  className="cursor-pointer"
                />
                <div className="relative inset-0 flex items-center justify-center  bg-opacity-50 rounded-full opacity-100 transition-opacity duration-300">
                  <input
                    type="file"
                    onChange={handleUploadFile}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Upload Project
                  </div>
                </div>{" "}
                {loadingFile ? (
                  <div className="w-36 flex items-center justify-center border border-black/30 h-36 object-center object-cover rounded-full transition-all duration-500 delay-500 transform">
                    Uploading...{" "}
                  </div>
                ) : fileUploaded ? (
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}${fileUploaded}`}
                    download
                    target="_blank"
                    title="Download File"
                    className="relative w-12 h-12 block"
                  >
                    <img
                      src={`/images/file.svg`}
                      alt="."
                      className="w-12 h-12 object-center object-cover rounded-full transition-all duration-500 delay-500 transform cursor-pointer"
                    />
                  </a>
                ) : null}
                {fileUploaded && (
                  <div
                    onClick={() => handleSave(course?.project?.id)}
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Send Project
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-between m-[5px]">
                <div
                  className={`w-full text-center items-center 
                    shadow-sm p-[5px] m-[5px] border-[1px] 
                    rounded-[10px] cursor-pointer
                      `}
                >
                  <div className="text-[#8097ca] text-start">
                    {course?.registered_section?.name}
                  </div>
                  <div className="text-[#7ae188] w-full text-start">
                    Lessons:
                  </div>
                  <div>
                    {course?.registered_section?.sessions?.map(
                      (session: any, index: number) => (
                        <div
                          className="flex items-center justify-between px-10 border-b pb-2"
                          key={index}
                        >
                          <div className="text-start ml-[10px]">
                            - {session?.lesson?.name} / {session?.date}{" "}
                            {session?.time}
                          </div>
                          {session?.meet_url && (
                            <a
                              target="_blank"
                              href={session?.meet_url}
                              onClick={() => {
                                // handleOpenIframe(session?.meet_url);
                                attend(session?.lesson_id);
                              }}
                              className=" bg-green-200 p-1 rounded cursor-pointer hover:text-blue-500"
                            >
                              Enter Lesson
                            </a>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      )}
      {openIframe.show && (
        <Dialog
          className="z-[999]"
          open={openIframe.show}
          handler={_openIframe}
          style={{
            height: "90dvh",
            maxWidth: "90%",
            minWidth: "60%",
          }}
        >
          <DialogBody>
            {openIframe.url && <iframe src={openIframe.url}></iframe>}
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}
