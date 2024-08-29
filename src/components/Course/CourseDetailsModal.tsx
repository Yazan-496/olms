import { Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import CanCall from "utils/ability";

interface CourseModalProps {
  data: any;
  handleClose: () => void;
  _refresh: () => void;
  open: boolean;
  handleOpen: () => void;
  handleRegister: ({
    section_id,
    is_subscribed,
    is_available,
    course_id,
  }: {
    section_id: number;
    is_subscribed: boolean;
    is_available: boolean;
    course_id: number;
  }) => void;
}
const CourseDetailsModal = ({
  data,
  _refresh,
  handleClose,
  open,
  handleOpen,
  handleRegister,
}: CourseModalProps) => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <Dialog
      className="z-[999]"
      open={open}
      handler={handleOpen}
      style={{
        maxWidth: "90%",
        minWidth: "60%",
      }}
    >
      <DialogBody>
        <div className="antialiased text-gray-900 ">
          <div className="flex items-center justify-center">
            <div className="bg-white w-full rounded-lg overflow-hidden shadow-2xl ">
              {/*E11*/}
              {/* <div class="h-48 bg-cover bg-center" style="background-image:url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')"></div>*/}
              {data?.photo_path && (
                <img
                  className="h-48 w-full object-cover object-end"
                  src={`${import.meta.env.VITE_BASE_URL}${data.photo_path}`}
                  alt="Home in Countryside"
                />
              )}
              <div className="p-6">
                <div className="flex items-baseline">
                  <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
                    {data?.category?.name}
                  </span>
                </div>
                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                  {data?.name}
                </h4>
                <div className="mt-1">
                  <span>{data?.price}</span>
                  <span className="text-gray-600 text-sm"></span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-teal-600 font-semibold">
                    <span>
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="far fa-star" />
                      <span>Start Date</span>
                      <span className="ml-2 text-gray-600 text-sm">
                        {data?.started_at}
                      </span>
                    </span>
                  </span>
                </div>
                <div className="mt-[10px] mb-[10px]">
                  <div className="text-[#e88585]">Sections:</div>
                  <div className="flex flex-row justify-between m-[5px]">
                    {data?.sections?.map((one: any) => (
                      <div
                        className={`w-full text-center items-center 
                    shadow-sm p-[5px] m-[5px] border-[1px] 
                    rounded-[10px] cursor-pointer ${
                      one.id === selectedSection ? "bg-[#cde4e9]" : ""
                    }`}
                        onClick={() => {
                          setSelectedSection(one.id);
                        }}
                      >
                        <div className="text-[#8097ca] text-start">
                          {one.name}
                        </div>
                        <div className="text-[#7ae188] w-full text-start">
                          Lessons:
                        </div>
                        <div>
                          {one?.sessions?.map((session: any, index: number) => (
                            <div className="text-start ml-[10px]" key={index}>
                              - {session?.lesson?.name} / {session?.date}{" "}
                              {session?.time}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-between mt-6 w-3">
          <CanCall permission="REGISTER_COURSE">
            <button
              onClick={() => {
                handleRegister({
                  is_subscribed: !!data?.is_subscribed,
                  is_available: !!data?.is_available,
                  section_id: parseInt(selectedSection ?? "0"),
                  course_id: parseInt(data?.id),
                });
              }}
              className="border-[1px] text-[#757ecb] border-[#757ecb] 
            mr-[20px]
            rounded-[10px] p-[5px] border-solid cursor-pointer 
            disabled:cursor-not-allowed disabled:text-[#6f6f6f] disabled:border-[#6f6f6f]
            "
              disabled={!selectedSection}
            >
              Register
            </button>
          </CanCall>
          <button
            onClick={handleClose}
            className="border-[1px] text-[#d56969] border-[#d56969] 
            rounded-[10px] p-[5px] border-solid cursor-pointer 
            disabled:cursor-not-allowed disabled:text-[#6f6f6f] disabled:border-[#6f6f6f]
            "
          >
            Cancel
          </button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default CourseDetailsModal;
