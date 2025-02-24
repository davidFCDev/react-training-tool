import { useState } from "react";

import { currentYear } from "@/constants";

const useDateSelector = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const formatDate = (dayIndex: number) => {
    return `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(dayIndex).padStart(2, "0")}`;
  };

  return {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    selectedDate,
    setSelectedDate,
    formatDate,
  };
};

export default useDateSelector;
