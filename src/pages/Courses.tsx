import CourseCard from "components/Course/CourseCard";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import API from "utils/API";

const Courses = () => {
  const { user } = useLayout();
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const fetchData = (filter: any, setCourses: any) => {
    setLoading(true);
    const url = `/api/courses${filter ? `?filter=${filter}` : ""}`;
    API.get(
      url,
      {},
      (data) => {
        setLoading(false);
        setCourses(data?.data || []);
      },
      (e) => {
        setLoading(false);
      },
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };

  useEffect(() => {
    fetchData("", setAllCourses);
  }, []);

  useEffect(() => {
    if (activeTab === "all") {
      fetchData("", setAllCourses);
    } else if (activeTab === "my-courses") {
      fetchData("my-courses", setMyCourses);
    } else if (activeTab === "active-courses") {
      fetchData("active-courses", setActiveCourses);
    }
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getCoursesToDisplay = () => {
    switch (activeTab) {
      case "all":
        return allCourses;
      case "my-courses":
        return myCourses;
      case "active-courses":
        return activeCourses;
      default:
        return [];
    }
  };

  return (
    <AuthLayout title="Courses">
      <div className="mb-4 border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${
              activeTab === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("all")}
          >
            All Courses
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${
              activeTab === "my-courses"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("my-courses")}
          >
            My Courses
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${
              activeTab === "active-courses"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("active-courses")}
          >
            Active Courses
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {loading && (
          <div className="flex items-center justify-center h-40">
            <LoadingSpinner />
          </div>
        )}
        {getCoursesToDisplay().map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </AuthLayout>
  );
};

export default Courses;
