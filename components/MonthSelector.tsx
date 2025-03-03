import { Select, SelectItem } from "@nextui-org/select";

import { months } from "@/constants";
import { MonthSelectorProps } from "@/types";

const MonthSelector = ({
  selectedMonth,
  setSelectedMonth,
  monthsWithTraining,
}: MonthSelectorProps) => {
  return (
    <Select
      isRequired
      className="w-48"
      label="Month"
      selectedKeys={new Set([String(selectedMonth)])}
      onSelectionChange={(keys) =>
        setSelectedMonth(Number(Array.from(keys)[0]))
      }
    >
      {months.map((month, index) => (
        <SelectItem key={String(index)} textValue={month} value={String(index)}>
          {month} {monthsWithTraining.has(index) ? "✅" : ""}
        </SelectItem>
      ))}
    </Select>
  );
};

export default MonthSelector;
