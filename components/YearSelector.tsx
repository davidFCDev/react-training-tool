import { Select, SelectItem } from "@nextui-org/select";

import { years } from "@/constants";

interface YearSelectorProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const YearSelector = ({ selectedYear, setSelectedYear }: YearSelectorProps) => {
  return (
    <Select
      isRequired
      className="w-32"
      label="Year"
      selectedKeys={new Set([String(selectedYear)])}
      onSelectionChange={(keys) => setSelectedYear(Number(Array.from(keys)[0]))}
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
  );
};

export default YearSelector;
