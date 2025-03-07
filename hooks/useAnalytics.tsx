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
  const [strengthChartData, setStrengthChartData] = useState<any[]>([]);
  const [gimnasticsChartData, setGymnasticsChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataService = new DataService();

        // Get total training count by type, filtered by month
        const counts = await dataService.getTrainingCountByType(
          "programming",
          (data) => {
            if (selectedMonth === null) return true;
            const date = new Date(data.date);

            return date.getMonth() + 1 === selectedMonth;
          }
        );

        setTrainingCounts(counts);

        // Get total training minutes by day of the week and type, filtered by month
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

        // Calculate max minutes for Y-axis
        const max = Math.max(
          ...Object.values(minutesByDay).flatMap((dayData) =>
            Object.values(dayData)
          )
        );

        setMaxMinutes(max);

        // Get grouped exercise counts by month
        const { strengthData, gymnasticsData } =
          await dataService.getGroupedExerciseCountsByMonth(
            "programming",
            selectedMonth
          );

        setStrengthChartData(strengthData);
        setGymnasticsChartData(gymnasticsData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  // Convert training counts for PieChart
  const trainingPieChartData = Object.entries(trainingCounts).map(
    ([type, count]) => ({
      id: type,
      value: count,
      label: type,
    })
  );

  // Format training minutes by day for BarChart
  const trainingBarChartData = Object.keys(trainingMinutesByDay).map((day) => {
    const dayData = trainingMinutesByDay[day];
    const transformed: { [key: string]: number | string } = { day };

    allTypes.forEach((type) => {
      transformed[type] = dayData[type] ?? 0;
    });

    return transformed;
  });

  // Bar chart series config
  const series = allTypes.map((type) => ({
    dataKey: type,
    label: type,
  }));

  return {
    trainingBarChartData,
    trainingPieChartData,
    series,
    maxMinutes,
    trainingCounts,
    strengthChartData,
    gimnasticsChartData,
  };
};
