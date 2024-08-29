import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import CanCall from "utils/ability";

export default function UsersTable({
  handleOpenEdit,
  handleDelete,
  users,
}: {
  users: any;
  handleOpenEdit: (user: any) => void;
  handleDelete: (user: any) => void;
}) {
  const { translate } = useLayout()
  const TABLE_HEAD = [translate("member"), translate("email"), translate("birthdate"), translate("id"), translate("actions")];

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
          {users.length > 0 ? (
            <tbody className="w-full">
              {users.map((user: any, index: number) => (
                <tr
                  key={index}
                  className={`bg-white border-b !w-full dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? "" : "bg-gray-50"
                    }`}
                >
                  <td className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white flex items-center space-x-2">
                    {user.personal_picture && (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${user.personal_picture
                          }`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span>{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-start">{user.email}</td>
                  <td className="px-6 py-4 text-start">{user.birth_date}</td>
                  <td className="px-6 py-4  text-start">
                    {user.national_number}
                  </td>
                  <td className="text-left flex items-center justify-center gap-2 px-6 py-4 ">
                    <CanCall permission="UPDATE_STUDENT">
                      <a
                        onClick={() => handleOpenEdit(user)}
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {translate("edit")}
                      </a>
                    </CanCall>
                    <CanCall permission="DELETE_STUDENT">
                      <a
                        onClick={() => handleDelete(user)}
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        {translate("delete")}
                      </a>
                    </CanCall>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <span className=" z-10 w-full flex items-center justify-center p-10">
              <LoadingSpinner />
            </span>
          )}
        </table>
      </div>
    </>
  );
}
