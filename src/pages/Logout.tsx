import { useLayout } from "layout";

const Logout = () => {
  const { user, setUser } = useLayout();
  setUser(null);
  return <>logout</>;
};
export default Logout;
