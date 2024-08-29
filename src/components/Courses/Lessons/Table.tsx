import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import CanCall from "utils/ability";

export interface Lesson {
  id?: number;
  course_id?: number;
  name?: string;
  description?: string;
  file?: string;
  sessions?: Session[];
}

export interface Session {
  meet_url?: string;
  id?: number;
  lesson_id?: number;
  type?: null;
  time?: string;
  date?: string;
  duaration?: number;
  section_id?: number;
  section?: Section;
}

export interface Section {
  id?: number;
  course_id?: number;
  name?: string;
  capacity?: null;
  days_of_week?: DaysOfWeek[];
}

export interface DaysOfWeek {
  duration?: number;
  time?: string;
  day?: number;
}

export default function LessonsTable({
  handleOpenEdit,
  handleDelete,
  lessons,
  course_id
}: {
  lessons: any;
  handleOpenEdit: (user: any) => void;
  handleDelete: (user: any) => void;
  course_id: number
}) {
  const { translate } = useLayout()
  const TABLE_HEAD = [
    translate("id"),
    translate("name"),
    translate("description"),
    translate("actions")
  ];

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
          {lessons?.length > 0 ? (
            <tbody className="w-full">
              {lessons?.map((lesson: Lesson, index: number) => (
                <tr
                  key={index}
                  className={`bg-white border-b !w-full dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? "" : "bg-gray-50"
                    }`}
                >
                  <td className="px-6 py-4 text-start">
                    <span>{lesson?.id}</span>
                  </td>
                  <td className="px-6 py-4 text-start">
                    <span>{lesson?.name}</span>
                  </td>
                  <td className="px-6 py-4 text-start">
                    {lesson?.description}
                  </td>
                  <td className="text-left flex items-start justify-start gap-2 px-2 py-2 ">
                    <CanCall permission="UPDATE_COURSE">
                      <a
                        onClick={() => handleOpenEdit(lesson)}
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {translate("edit")}
                      </a>
                    </CanCall>
                    <CanCall permission="DELETE_COURSE">
                      <a
                        onClick={() => handleDelete(lesson)}
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
