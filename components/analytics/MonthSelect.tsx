"use client";
import { Select, SelectItem } from "@nextui-org/select";

import { MONTH_SELECT } from "@/constants";

interface MonthSelectProps {
  selectedMonth: number | null;
  setSelectedMonth: (month: number | null) => void;
}

const MonthSelect: React.FC<MonthSelectProps> = ({
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <Select
      className="max-w-xs"
      label="Select a month"
      name="month-select"
      selectedKeys={selectedMonth !== null ? [String(selectedMonth)] : ["null"]}
      variant="faded"
      onChange={(e) => {
        const value = e.target.value;

        setSelectedMonth(value === "null" ? null : parseInt(value));
      }}
    >
      {MONTH_SELECT.map((month) => (
        <SelectItem key={String(month.value ?? "null")} aria-label={month.name}>
          {month.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default MonthSelect;
