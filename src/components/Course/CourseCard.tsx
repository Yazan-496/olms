const CourseCard = ({
  course,
  _openCourseDetails,
  waitDetails
}: {
  course: any;
  _openCourseDetails: (id: any) => void;
  waitDetails: any
}) => {
  return (
    <div
      key={course?.id}
      className="relative grid grid-rows-[55%_55%_10] rounded overflow-hidden shadow-lg group"
    >
      {course?.photo_path && (
        <img
          className="w-full h-[350px] object-cover"
          src={`${import.meta.env.VITE_BASE_URL}${course?.photo_path}`}
          alt="Course"
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course?.name}</div>
        <p className="text-gray-700 text-base">{course?.description}</p>
      </div>
      <div className="px-6 flex items-end relative bottom-0 justify-between w-full pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {course?.started_at}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {course?.teacher?.name}
        </span>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-[90%] bg-black bg-opacity-50 rounded-t-3xl transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 visibility-hidden group-hover:visibility-visible">
        <div className="flex gap-4">
          <button
            onClick={() => _openCourseDetails(course?.id)}
            className="bg-gray-300 text-gray-700 px-4 py-2  rounded-[10px]"
          >
            Details {waitDetails === course?.id ? "..." : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
