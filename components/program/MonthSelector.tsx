import { Select, SelectItem } from "@nextui-org/select";

import { CheckIcon } from "../common/icons";

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
      variant="faded"
      onSelectionChange={(keys) =>
        setSelectedMonth(Number(Array.from(keys)[0]))
      }
    >
      {months.map((month, index) => (
        <SelectItem key={String(index)} textValue={month} value={String(index)}>
          <div className="flex justify-start items-center gap-2 w-full">
            <span>{month}</span>
            {monthsWithTraining.has(index) && (
              <CheckIcon className="text-success" size={20} />
            )}
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};

export default MonthSelector;
