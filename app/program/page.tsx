/* eslint-disable no-console */
"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

import { AddIcon } from "@/components/icons";
import withAuth from "@/hoc/withAuth";
import { getDaysInMonth } from "@/utils/dateUtils";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

function Program() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDayOfMonth =
    (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7; // Ajuste para lunes
  const lastDayOfMonth =
    (new Date(selectedYear, selectedMonth, daysInMonth).getDay() + 6) % 7;
  const totalDays = firstDayOfMonth + daysInMonth + (6 - lastDayOfMonth);

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center p-4">
      <header className="mb-6">
        <h1 className="title">Program</h1>
        <p className="subtitle">Create your own training program</p>
      </header>

      <div className="mb-4 flex gap-4">
        <Select
          isRequired
          aria-label="Select a month"
          className="w-48"
          label="Month"
          placeholder="Select a month"
          selectedKeys={new Set([String(selectedMonth)])}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];

            if (selectedKey) {
              setSelectedMonth(Number(selectedKey));
            }
          }}
        >
          {months.map((month, index) => (
            <SelectItem
              key={String(index)}
              textValue={month}
              value={String(index)}
            >
              {month}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          aria-label="Select a year"
          className="w-32"
          label="Year"
          placeholder="Select a year"
          selectedKeys={new Set([String(selectedYear)])}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];

            if (selectedKey) {
              setSelectedYear(Number(selectedKey));
            }
          }}
        >
          {years.map((year) => (
            <SelectItem
              key={String(year)}
              textValue={String(year)}
              value={String(year)}
            >
              {year}
            </SelectItem>
          ))}
        </Select>
      </div>

      <main className="grid grid-cols-7 gap-2 w-full">
        {Array.from({ length: totalDays }, (_, i) => {
          const dayIndex = i - firstDayOfMonth + 1;
          const isSunday =
            (new Date(selectedYear, selectedMonth, dayIndex).getDay() + 6) %
              7 ===
            6;
          const isPlaceholder = dayIndex < 1 || dayIndex > daysInMonth;

          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-center rounded-lg p-4 h-40 w-40 shadow-md relative hover:bg-zinc-700 transition-all cursor-pointer 
                ${isPlaceholder ? "bg-zinc-800 opacity-50" : isSunday ? "bg-success" : "bg-zinc-800"}`}
            >
              {!isPlaceholder && (
                <>
                  <span className="absolute top-2 left-2 text-lg text-gray-300 tracking-wider anton-regular">
                    {dayIndex}
                  </span>
                  <button
                    className={`${isSunday ? "text-white" : "text-gray-300"} `}
                  >
                    <AddIcon size={24} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default withAuth(Program);
