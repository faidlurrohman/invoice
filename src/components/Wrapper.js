import React from "react";
import { DatabaseOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

const menus = [
  {
    title: "Job",
    link: "job",
    icon: <DatabaseOutlined />,
  },
  {
    title: "Job Type",
    link: "jobtype",
    icon: <DatabaseOutlined />,
  },
  {
    title: "Customer",
    link: "customer",
    icon: <DatabaseOutlined />,
  },
  {
    title: "Customer Type",
    link: "customertype",
    icon: <DatabaseOutlined />,
  },
  {
    title: "Customer Code",
    link: "customercode",
    icon: <DatabaseOutlined />,
  },
  {
    title: "Bank",
    link: "bank",
    icon: <DatabaseOutlined />,
  },
  {
    title: "Invoice",
    link: "invoice",
    icon: <DatabaseOutlined />,
  },
];

const mainBgColor = "bg-white";

export default function Wrapper() {
  return (
    <div
      className={`flex md:fixed inset-x-0 z-10`}
      style={{
        height: `calc(100vh - 2px)`,
      }}
    >
      <div
        className={`hidden md:block h-full w-full md:w-1/4 lg:w-1/5 flex-none`}
      >
        <nav
          className={`md:py-0 leading-loose w-8/12 md:w-full border-r border-gray-300 flex flex-col bg-white md:${mainBgColor} h-full`}
        >
          <div className="p-5 md:pr-0 flex-grow">
            <ul>
              {menus.map((item) => (
                <li key={item.title} className={`block`}>
                  <Link
                    to={item.link}
                    className="flex items-center text-lg text-black hover:text-blue-400 hover:bg-white px-3 py-2 rounded-full"
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <main className={`flex-grow md:overflow-y-auto`}>
        <Outlet />
      </main>
    </div>
  );
}
