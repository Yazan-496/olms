import { useLayout } from "layout";
import { useState } from "react";
import API from "utils/API";

export default function ProjectTable({
  handleOpenEdit,
  handleDelete,
  projects,
  _refresh,
}: {
  projects: any;
  handleOpenEdit: (user: any) => void;
  _refresh: () => void;
  handleDelete: (user: any) => void;
}) {
  const { translate } = useLayout();
  const TABLE_HEAD = [
    translate("id"),
    translate("student_name"),
    translate("name"),
    translate("description"),
    translate("file"),
    translate("degree"),
  ];

  const [degrees, setDegrees] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const handleEditClick = (id: string) => {
    setIsEditing((prev) => ({ ...prev, [id]: true }));
  };

  const handleSaveClick = (data: any) => {
    setIsEditing((prev) => ({ ...prev, [data.student_id]: false }));
    onSave(data);
  };
  const { user, notify } = useLayout();
  const onSave = async (data: any) => {
    await API.put(
      `/api/grades/${data.id}`,
      {
        ...data,
        degree: degrees[data?.student_id],
      },
      (data) => {
        _refresh();
        notify({
          type: "success",
          message: "Project Degree Updated Successfully",
          timeout: 2000,
        });
      },
      (e) => {},
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  const handleDegreeChange = (id: string, value: string) => {
    setDegrees((prev) => ({ ...prev, [id]: value }));
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
          {projects?.length > 0 ? (
            <tbody className="w-full">
              {projects?.map((transaction: any, index: number) => (
                <tr
                  key={index}
                  className={`bg-white border-b !w-full dark:bg-gray-800 dark:border-gray-700 ${
                    index % 2 === 0 ? "" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4  text-start">
                    {transaction?.student.id}
                  </td>
                  <td className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white flex items-center space-x-2">
                    {transaction?.student?.personal_picture && (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${
                          transaction?.student?.personal_picture
                        }`}
                        alt={transaction?.student?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span>{transaction?.student?.name}</span>
                  </td>
                  <td className="px-6 py-4 text-start">{transaction?.name}</td>
                  <td className="px-6 py-4 text-start">
                    {transaction?.description}
                  </td>
                  <td className="px-6 py-4 text-start flex items-center justify-center">
                    {transaction?.file && (
                      <a
                        href={`${import.meta.env.VITE_BASE_URL}${
                          transaction?.file
                        }`}
                        download
                        target="_blank"
                        title="Download File"
                        className="relative w-6 h-6 block"
                      >
                        <img
                          src={`/images/file.svg`}
                          alt="."
                          className="w-6 h-6 object-center object-cover rounded-full transition-all duration-500 delay-500 transform cursor-pointer"
                        />
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-start">
                    {isEditing[transaction?.student.id] ? (
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={
                            degrees[transaction?.student.id] ||
                            transaction?.student?.grade?.degree
                          }
                          onChange={(e) =>
                            handleDegreeChange(
                              transaction?.student.id,
                              e.target.value
                            )
                          }
                          className="border rounded-md px-2 py-1"
                        />
                        <button
                          onClick={() => handleSaveClick(transaction?.grade)}
                          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span>{transaction?.grade?.degree}</span>
                        <button
                          onClick={() =>
                            handleEditClick(transaction?.student.id)
                          }
                          className="ml-2 bg-gray-300 text-gray-700 px-2 py-1 rounded-md"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </>
  );
}
