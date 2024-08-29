import { Dialog, DialogBody } from "@material-tailwind/react";
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
  const TABLE_HEAD = [
    "ID",
    "Photo",
    "Course Name",
    "Course Description",
    "price",
    "Details",
    "Degree",
  ];

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
                        <div className="text-start ml-[10px]" key={index}>
                          - {session?.lesson?.name} / {session?.date}{" "}
                          {session?.time}
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
    </>
  );
}
