"use client";

import { useTheme } from "next-themes";
import React from "react";

interface ChartContainerProps {
  text: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ text, children }) => {
  const theme = useTheme();

  return (
    <div
      className={` bg-zinc-800 flex flex-col items-center justify-center rounded-xl p-6 border  ${theme.theme === "dark" ? "bg-zinc-800 border-zinc-600" : "bg-zinc-100 border-zinc-300"}`}
    >
      <p
        className={`${theme.theme === "dark" ? "text-zinc-200 bg-zinc-900" : "text-zinc-800 bg-zinc-50"} text-base w-full p-2 rounded-lg`}
      >
        {text}
      </p>
      {children}
    </div>
  );
};

export default ChartContainer;
