import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Toaster } from "react-hot-toast";
import { notify } from "utils/notify";
interface LayoutContextProps {
  loadingPage: boolean;
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  notify: ({
    type,
    message,
    timeout,
  }: {
    type?: string;
    message: string;
    timeout?: number;
  }) => void;
}
const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [loadingPage, setLoadingPage] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("USER")
      ? localStorage.getItem("USER")
      : null;
    if (storedUser && !user) {
      const userData = JSON.parse(storedUser);
      setUser({ ...userData });
    }
  }, []);
  useEffect(() => {
    // console.log(user, "user");
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
  }, [user]);
  return (
    <LayoutContext.Provider
      value={{ loadingPage, setLoadingPage, notify, user, setUser }}
    >
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "font-light text-[12px]",
          style: {
            background: "#404040",
            color: "#fafafa",
          },
        }}
      />
    </LayoutContext.Provider>
  );
};
