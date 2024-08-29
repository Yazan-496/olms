import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Toaster } from "react-hot-toast";
import { notify } from "utils/notify";
import enTranslations from "translations/en.json";
import arTranslations from "translations/ar.json";
export interface User {
  id?: number;
  name?: string;
  email?: string;
  role_id?: number;
  national_number?: string;
  central_number?: string;
  financial_id?: null;
  surname?: null;
  birth_date?: Date;
  father_name?: string;
  mother_name?: string;
  personal_picture?: string;
  deleted_at?: null;
  role?: Role;
  access_token?: string;
  permissions?: string[];
  img?: string;
}

export interface Role {
  id?: number;
  name?: string;
}

interface LayoutContextProps {
  loadingPage: boolean;
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
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
  translate: (key: string) => string;
  setLanguage: (language: string) => void;
  language: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [readLocaStorage, setReadLocaStorage] = useState(false);
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("lang") || "en"
  );
  const translations: any = {
    en: enTranslations,
    ar: arTranslations,
  };
  const translate = (key: string): string => {
    console.log(key, translations[language], translations[language][key]);
    return translations[language][key] || key;
  };
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
  // if (!readLocaStorage) {
  //   return <div>Loading...</div>;
  // }
  return (
    <LayoutContext.Provider
      value={{
        loadingPage,
        setLoadingPage,
        notify,
        user,
        setUser,
        _removeUser,
        translate,
        language,
        setLanguage,
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
