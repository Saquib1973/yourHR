"use client";
import React from "react";

const Button = ({
  children,
  red = false,
  col = -1,
}: {
  children: React.ReactNode;
  red?: Boolean;
  col?: any;
}) => {
  return (
    <span
      className={`relative inline-block h-auto ${
        col != -1
          ? col % 5 == 0
            ? "!bg-cyan-400"
            : col % 5 == 1 || col % 5 == 3
            ? "md:col-span-2 !bg-green-400"
            : col % 5 == 2
            ? "md:row-span-2 !bg-yellow-400"
            : "md:row-span-1 md:col-span-1 !bg-purple-400"
          : ""
      } rounded-sm group ${red ? "bg-red-100" : "bg-gray-300"} group w-auto`}
    >
      <span
        className={`group-active:translate-x-[0.010rem] h-full group-active:translate-y-[0.010rem] group-hover:-translate-x-1 group-hover:-translate-y-1 px-3 transition-all rounded-sm border duration-150 border-transparent active:border-white ${
          !red ? "bg-black" : "bg-red-500"
        } text-white h-auto  p-1.5 -translate-x-1.5 -translate-y-1.5 relative flex items-center justify-center`}
      >
        {children}
      </span>
    </span>
  );
};

export default Button;
