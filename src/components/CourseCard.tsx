import { NavLink } from "react-router-dom";

const CourseCard = ({ data }: { data: any }) => {
  return (
    <div className="relative w-full py-2 px-20">
      <NavLink to="/signup">
        {/* Background image */}
        <div className="relative z-20 h-[450px] border object-cover shadow-lg border-gray-300 p-6 rounded-lg">
          <img
            className="absolute z-1 inset-0 bg-cover bg-center bg-no-repeat opacity-1 w-full h-full"
            src={`${import.meta.env.VITE_BASE_URL}${data.photo_path}`}
          />
          <div className="flex z-20 relative flex-col h-full justify-between">
            <div className="flex items-center justify-center">
              <h2 className="bg-white text-center w-fit p-2 rounded-[10px] shadow-lg text-lg font-medium title-font mb-2  opacity-1 z-10 relative ">
                {data.name}
              </h2>
            </div>
            <div className="text-center mt-2  opacity-1 z-10 relative  leading-none flex justify-between w-full">
              <div className="flex bg-white rounded-[10px] shadow-lg p-2">
                <span className="mr-3 inline-flex items-center leading-none text-sm py-1">
                  <svg
                    className="fill-current w-4 h-4 mr-2 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
                  </svg>
                  {data.started_at}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <p className="bg-white text-center w-fit p-2 rounded-[10px] shadow-lg text-lg font-medium title-font mb-2  opacity-1 z-10 relative ">
                  {data.description}
                </p>
              </div>
              <div className="flex bg-white rounded-[10px] shadow-lg p-2">
                <span className="inline-flex items-center leading-none text-sm">
                  <svg
                    width={22}
                    height={22}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path fill="#D8D8D8" d="M15.6 17.667h3.5V3h-3.5z" />
                      <path fill="#667EEA" d="M9.2 6.583v11.08h3.5V6.583z" />
                      <path fill="#667EEA" d="M2.6 17.667h3.5v-7.334H2.6z" />
                    </g>
                  </svg>
                  {data?.teacher?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default CourseCard;
