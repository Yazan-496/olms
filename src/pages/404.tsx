import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center text-2xl">
      Redirecting....
    </div>
  );
};
export default NotFound;
