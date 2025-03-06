"use client";
import { useState } from "react";

import TrainingStackedBarChart from "@/components/analytics/BarChart";
import ChartContainer from "@/components/analytics/ChartContainer"; // Importamos el nuevo componente
import Legend from "@/components/analytics/Legend";
import MonthSelect from "@/components/analytics/MonthSelect";
import TrainingPieChart from "@/components/analytics/PieChart";
import withAuth from "@/hoc/withAuth";
import { useAnalytics } from "@/hooks/useAnalytics";

function Analytics() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const { pieChartData, barChartData, series, maxMinutes, trainingCounts } =
    useAnalytics(selectedMonth);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="title">
        <span className="text-success">A</span>nalytics
      </h1>
      <p className="subtitle">Check your progress and improve your results</p>

      <div className="mt-6 w-full flex items-center justify-center gap-4">
        {/* Usamos el componente MonthSelect */}
        <MonthSelect
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <Legend trainingCounts={trainingCounts} />
      </div>

      <div className="w-full flex flex-col items-center mt-6 gap-4">
        <div className="flex gap-4 w-full">
          {/* Usamos el componente ChartContainer */}
          <ChartContainer text="Training distribution by month">
            <TrainingPieChart chartData={pieChartData} />
          </ChartContainer>

          <ChartContainer text="Total training minutes by day of the week in a month">
            <TrainingStackedBarChart
              chartData={barChartData}
              maxMinutes={maxMinutes}
              series={series}
            />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Analytics);
