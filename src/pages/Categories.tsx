import { LoadingSpinner } from "components/Svgs";
import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import API from "utils/API";

const Categories = () => {
  const { user } = useLayout();
  const { course, lesson } = useParams();
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
  useEffect(() => {
    _fetchData();
  }, []);
  return (
    <AuthLayout title={"Categories"}>
      {loading && (
        <span className=" z-10 w-full flex items-center justify-center p-10">
          <LoadingSpinner />
        </span>
      )}
      <div className="grid grid-cols-3 gap-10">
        {categories?.map((cate: any, i: number) => {
          return (
            <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{cate?.name}</div>
                <p className="text-gray-700 text-base">{cate?.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {cate?.courses?.map((course: any, ii: number) => {
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
