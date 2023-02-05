import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <img
        className="max-w-full md:max-w-md"
        src={"/error_404.png"}
        alt="Not found"
      />
      <p className="m-0 text-right text-xs">
        An art by{" "}
        <a target="_blank" href="https://dribbble.com/siddhitaupare">
          Siddhita upare
        </a>
      </p>
      <p className="mt-10 flex flex-row items-center space-x-5">
        <a
          href="/"
          className="text-gray-700 hover:text-black my-transition flex items-center hover:bg-gray-300 py-2 px-5 rounded-full"
        >
          <ArrowLeftOutlined /> <span className="ml-2">Go Back</span>
        </a>
      </p>
    </div>
  );
}
