import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useLayout } from "layout";

interface CourseModalProps {
  data: any;
  handleClose: () => void;
  _refresh: () => void;
  open: boolean;
  handleOpen: () => void;
}
const CourseDetailsModal = ({
  data,
  _refresh,
  handleClose,
  open,
  handleOpen,
}: CourseModalProps) => {
  const { user, notify } = useLayout();

  return (
    <Dialog className="z-[999]" open={open} handler={handleOpen}>
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
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-between mt-6">
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default CourseDetailsModal;
