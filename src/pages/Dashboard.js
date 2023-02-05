import React from "react";

export default function Dashboard() {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <img
        className="max-w-full md:max-w-md"
        src={"/logo192.png"}
        alt="Not found"
      />
      <p className="m-0 text-right text-md">This is a demo for Invoice App.</p>
    </div>
  );
}
