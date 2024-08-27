import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useLayout } from "layout";
import { useState } from "react";
import API from "utils/API";
interface UserModalDeleteProps {
  handleClose: () => void;
  _refresh: () => void;
  open: boolean;
  modalData?: any;
  handleOpen: () => void;
}
const DeleteDialog = ({
  modalData,
  _refresh,
  handleClose,
  open,
  handleOpen,
}: UserModalDeleteProps) => {
  const { user, notify } = useLayout();

  const [loading, setLoading] = useState(false);
  const handleConfirm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await API.delete(
        `/api/courses/${modalData?.id}`,
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
        setLoading(false);
        handleClose();
        _refresh();
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody>{`Are you sure you want to delete this course? (${modalData?.name})`}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button onClick={handleConfirm} variant="filled" color="green">
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteDialog;
