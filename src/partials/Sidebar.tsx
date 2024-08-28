import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FavIcon from "/images/favicon.png";
import SidebarLinkGroup from "./SidebarLinkGroup";
import {
  AccountLogoSvg,
  ArrowUpDownSvg,
  CategoriesLogoSvg,
  CoursesLogoSvg,
  FinanceLogoSvg,
  LogoutLogoSvg,
  ProfileLogoSvg,
  SettingLogoSvg,
  StudentsLogoSvg,
  TransactionsLogoSvg,
  TutorssLogoSvg,
  UsersLogoSvg,
} from "components/Svgs";
import CanCall from "utils/ability";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: string;
}

const pages = [
  {
    name: "Users",
    permission: "SHOW_USERS",
    logo: <UsersLogoSvg />,
    children: [
      {
        name: "Employees",
        permission: "SHOW_EMPLOYEE",
        logo: <UsersLogoSvg />,
        route: "/employees",
      },
      {
        name: "Students",
        permission: "SHOW_STUDENT",
        logo: <StudentsLogoSvg />,
        route: "/students",
      },
      {
        name: "Teachers",
        permission: "SHOW_TEACHER",
        logo: <TutorssLogoSvg />,
        route: "/teachers",
      },
    ],
  },
  {
    name: "Courses",
    permission: "SHOW_COURSES",
    logo: <CoursesLogoSvg />,
    children: [
      {
        name: "Courses Managment",
        permission: "SHOW_COURSE",
        logo: <SettingLogoSvg />,
        route: "/courses-managment",
      },
      {
        name: "Registration",
        permission: "SHOW_REGISTERATION",
        logo: <SettingLogoSvg />,
        route: "/registration",
      },
      {
        name: "Courses",
        permission: "SHOW_MY_COURSES",
        logo: <CoursesLogoSvg />,
        route: "/courses",
      },
      {
        name: "Categories",
        permission: "SHOW_CATEGORY",
        logo: <CategoriesLogoSvg />,
        route: "/categories",
      },
    ],
  },
  {
    name: "Finance",
    permission: "SHOW_FINANCES",
    logo: <FinanceLogoSvg />,
    children: [
      {
        name: "Student Financial",
        permission: "SHOW_FINANCE",
        logo: <FinanceLogoSvg />,
        route: "/financials/finance",
      },
      {
        name: "Transactions",
        permission: "SHOW_TRANSACTIONS",
        logo: <TransactionsLogoSvg />,
        route: "/financials/transactions",
      },
    ],
  },
  {
    name: "Profile",
    permission: "SHOW_PROFILE",
    logo: <ProfileLogoSvg />,
    children: [
      {
        name: "Personal Informations",
        permission: "SHOW_PROFILE",
        logo: <ProfileLogoSvg />,
        route: "/profile/personal-informations",
      },
    ],
  },
  {
    name: "Settings",
    permission: "SHOW_PROFILE",
    logo: <SettingLogoSvg />,
    children: [
      {
        name: "My Account",
        permission: "SHOW_PROFILE",
        logo: <AccountLogoSvg />,
        route: "/account",
      },
      {
        name: "Logout",
        logo: <LogoutLogoSvg />,
        route: "/logout",
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
}) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const _checkActive = (page: any) => {
    const normalizedPathname = pathname.toLowerCase();
    return page.children.some((child: any) => {
      const normalizedRoute = child.route.toLowerCase();
      return normalizedPathname.startsWith(normalizedRoute);
    });
  };
  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } ${variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-sm"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-5 mt-5 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink
            end
            to="/dasshboard"
            className="w-full flex items-center justify-center h-full"
          >
            <img alt={"icon"} src={FavIcon} width={42} height={42} />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              {pages.map((page, key) => {
                return (
                  <CanCall permission={page.permission} key={key}>
                    <SidebarLinkGroup
                      activecondition={_checkActive(page)}
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <div
                              className={`block text-gray-800 text-lg dark:text-gray-100 truncate transition duration-150 ${pathname === page.name
                                ? ""
                                : "hover:text-gray-900 dark:hover:text-white"
                                }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleClick();
                                setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {page.logo}
                                  <span className="text-lg font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {page.name}
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="flex shrink-0 ml-2">
                                  <ArrowUpDownSvg open={open} />
                                </div>
                              </div>
                            </div>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-6 mt-2 ${!open && "hidden"}`}>
                                {page.children.map((child, i) => {
                                  return (
                                    <li
                                      key={i}
                                      className="mb-1 last:mb-0 flex items-center space-x-2 justify-start"
                                    >
                                      {child.logo}
                                      <NavLink
                                        end
                                        to={child.route}
                                        className={({ isActive }) =>
                                          "block transition duration-150 truncate " +
                                          (isActive
                                            ? "text-violet-500"
                                            : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                        }
                                      >
                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          {child.name}
                                        </span>
                                      </NavLink>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  </CanCall>
                );
              })}
            </ul>
          </div>
          {/* More group */}
        </div>
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
