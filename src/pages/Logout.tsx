import { useEffect } from "react";
import { useLayout } from "layout";

const Logout = () => {
  const { _removeUser } = useLayout();

  useEffect(() => {
    _removeUser();
  }, []);

  return <>logout</>;
};

export default Logout;
