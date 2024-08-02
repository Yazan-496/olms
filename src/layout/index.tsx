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
  _removeUser: () => void;
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
    }
  }, [user]);

  const _removeUser = () => {
    localStorage.removeItem("USER");
  };
  return (
    <LayoutContext.Provider
      value={{
        loadingPage,
        setLoadingPage,
        notify,
        user,
        setUser,
        _removeUser,
      }}
    >
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName="!z-[9999999999999999999999999]"
        containerStyle={{}}
        toastOptions={{
          className: "font-light text-[12px]",
          style: {
            position: "relative",
            background: "#404040",
            color: "#fafafa",
            zIndex: 9999, // Ensure this is high enough
          },
        }}
      />
    </LayoutContext.Provider>
  );
};
