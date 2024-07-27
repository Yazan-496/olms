import { useEffect } from "react";
import { useLayout } from "layout";

const Logout = () => {
  const { setUser } = useLayout();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  return <>logout</>;
};

export default Logout;
