import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import API from "utils/API";

const Courses = () => {
  const { user } = useLayout();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const _fetchData = () => {
    setLoading(true);
    API.get(
      "/api/courses",
      {},
      (data) => {
        setLoading(false);
        setCourses(data?.data);
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
  useEffect(() => {
    _fetchData();
  }, []);
  return (
    <AuthLayout title={"Courses"}>
      {loading && (
        <span className=" z-10 w-full flex items-center justify-center p-10">
          <LoadingSpinner />
        </span>
      )}
      <div className="grid grid-cols-3 gap-10">
        {courses?.map((course: any, i: number) => {
          return (
            <div
              key={i}
              className="max-w-sm rounded justify-between overflow-hidden shadow-lg"
            >
              {course?.photo_path && (
                <img
                  className="w-full h-[350px]"
                  src={`${import.meta.env.VITE_BASE_URL}${course?.photo_path}`}
                  alt="Sunset in the mountains"
                />
              )}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course?.name}</div>
                <p className="text-gray-700 text-base">{course?.description}</p>
              </div>
              <div className="px-6 flex h-max items-end relative bottom-0  justify-between w-full  pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {course?.started_at}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {course?.teacher?.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AuthLayout>
  );
};

export default Courses;
