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
  const [user, setUser] = useState(null);
  const [readLocaStorage, setReadLocaStorage] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    console.log(storedUser);
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setReadLocaStorage(true);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        setReadLocaStorage(true);
      }
    }
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
  }, [user]);

  const _removeUser = () => {
    localStorage.removeItem("USER");
    setUser(null);
  };
  if (!readLocaStorage) {
    return <div>Loading...</div>;
  }
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
