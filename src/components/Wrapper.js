import React from "react";
import { DatabaseOutlined, AppstoreFilled } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "antd";

const menus = [
  {
    key: "main_job",
    icon: <AppstoreFilled />,
    label: "Job",
    children: [
      {
        key: "job",
        label: "Job",
        icon: <DatabaseOutlined />,
      },
      {
        key: "jobtype",
        label: "Job Type",
        icon: <DatabaseOutlined />,
      },
    ],
  },
  {
    key: "main_customer",
    icon: <AppstoreFilled />,
    label: "Customer",
    children: [
      {
        key: "customer",
        label: "Customer",
        icon: <DatabaseOutlined />,
      },
      {
        key: "customertype",
        label: "Customer Type",
        icon: <DatabaseOutlined />,
      },
      {
        key: "customercode",
        label: "Customer Code",
        icon: <DatabaseOutlined />,
      },
    ],
  },
  {
    key: "bank",
    label: "Bank",
    icon: <DatabaseOutlined />,
  },
  {
    key: "invoice",
    label: "Invoice",
    icon: <DatabaseOutlined />,
  },
];

const mainBgColor = "bg-white";

export default function Wrapper() {
  const navigate = useNavigate();

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
            <Menu
              mode="inline"
              items={menus}
              onClick={({ key }) => {
                console.log("key", key);
                navigate(key);
              }}
            />
          </div>
        </nav>
      </div>
      <main className={`flex-grow md:overflow-y-auto`}>
        <Outlet />
      </main>
    </div>
  );
}
