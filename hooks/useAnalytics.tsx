/* eslint-disable no-console */
// hooks/useChart.ts
import { useEffect, useState } from "react";

import DataService from "@/service/data.service";

export const useAnalytics = (selectedMonth: number | null) => {
  const [trainingCounts, setTrainingCounts] = useState<Record<string, number>>(
    {}
  );
  const [trainingMinutesByDay, setTrainingMinutesByDay] = useState<
    Record<string, Record<string, number>>
  >({});
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [maxMinutes, setMaxMinutes] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataService = new DataService();

        // Get the total training count by type, filtered by month
        const counts = await dataService.getTrainingCountByType(
          "programming",
          (data) => {
            if (selectedMonth === null) return true;
            const date = new Date(data.date);

            return date.getMonth() + 1 === selectedMonth;
          }
        );

        setTrainingCounts(counts);

        // Get the total training minutes by day of the week and type, filtered by month
        const minutesByDay =
          await dataService.getTotalTrainingMinutesByDayOfWeekAndType(
            "programming",
            selectedMonth
          );

        setTrainingMinutesByDay(minutesByDay);

        // Get all unique training types
        const uniqueTypes = Array.from(
          new Set(
            Object.values(minutesByDay).flatMap((dayData) =>
              Object.keys(dayData)
            )
          )
        );

        setAllTypes(uniqueTypes);

        // Calculate the maximum number of minutes for the Y-axis
        const max = Math.max(
          ...Object.values(minutesByDay).flatMap((dayData) =>
            Object.values(dayData)
          )
        );

        setMaxMinutes(max);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  // Convert the training counts to the format required by the pie chart
  const pieChartData = Object.entries(trainingCounts).map(([type, count]) => ({
    id: type,
    value: count,
    label: type,
  }));

  // Format the training minutes by day of the week and type for the stacked bar chart
  const barChartData = Object.keys(trainingMinutesByDay).map((day) => {
    const dayData = trainingMinutesByDay[day];
    const transformed: { [key: string]: number | string } = { day };

    allTypes.forEach((type) => {
      transformed[type] = dayData[type] ?? 0;
    });

    return transformed;
  });

  // Config for the stacked bar chart series
  const series = allTypes.map((type) => ({
    dataKey: type,
    label: type,
  }));

  return {
    pieChartData,
    barChartData,
    series,
    maxMinutes,
    trainingCounts, // We return the counts for the legend
  };
};
