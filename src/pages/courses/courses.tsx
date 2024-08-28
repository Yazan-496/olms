import CourseCard from "components/Course/CourseCard";
import CourseDetailsModal from "components/Course/CourseDetailsModal";
import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import API from "utils/API";

const Courses = () => {
  const { user, notify } = useLayout();
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [open, setOpen] = useState<boolean>(false);
  const [course, setCourse] = useState([]);
  const _getCourse = async (id: any) => {
    try {
      const response = await API.get(
        `/api/courses/${id}`,
        {},
        (data) => data,
        (e) => {
          notify(e);
        },
        {
          Authorization: `Bearer ${user?.access_token}`,
        }
      );

      if (response.code === 200) {
        console.log(response);
        setCourse(response?.data ?? []);
      } else {
      }
    } catch (err) {}
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const _fetchData = () => {
    setLoading(true);
    const url = `/api/courses`;
    API.get(
      url,
      {},
      (data) => {
        setLoading(false);
        setAllCourses(data?.data || []);
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
    _fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === "all") {
      _fetchData();
    } else if (activeTab === "my-courses") {
      if (allCourses && allCourses?.length > 0) {
        setMyCourses(
          allCourses.filter((course: any) => !!course?.is_available)
        );
      }
    } else if (activeTab === "active-courses") {
      if (allCourses && allCourses?.length > 0) {
        setActiveCourses(
          allCourses.filter((course: any) => !!course?.is_available)
        );
      }
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

  const _openCourseDetails = async (id: any) => {
    await _getCourse(id);
    handleOpen();
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

      <CourseDetailsModal
        data={course}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        _refresh={_fetchData}
      />
      <div className="grid grid-cols-3 gap-6">
        {loading && (
          <div className="flex items-center justify-center h-40">
            <LoadingSpinner />
          </div>
        )}
        {getCoursesToDisplay().map((course, i) => (
          <CourseCard
            _openCourseDetails={_openCourseDetails}
            key={i}
            course={course}
          />
        ))}
      </div>
    </AuthLayout>
  );
};

export default Courses;
