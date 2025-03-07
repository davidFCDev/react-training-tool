"use client";
import { useState } from "react";

import ActivityBarChart from "@/components/analytics/BarChart";
import ChartContainer from "@/components/analytics/ChartContainer"; // Importamos el nuevo componente
import MonthSelect from "@/components/analytics/MonthSelect";
import ActivityPieChart from "@/components/analytics/PieChart";
import withAuth from "@/hoc/withAuth";
import { useAnalytics } from "@/hooks/useAnalytics";

function Analytics() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const {
    trainingBarChartData,
    trainingPieChartData,
    strengthChartData,
    gimnasticsChartData,
    series,
    maxMinutes,
  } = useAnalytics(selectedMonth);

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
      </div>

      <div className="w-full flex flex-col items-start mt-6 gap-4">
        <div className="flex gap-4 w-full">
          {/* Usamos el componente ChartContainer */}
          <ChartContainer text="Training distribution by month">
            <ActivityPieChart
              chartData={trainingPieChartData}
              colorPalette={["#76d7c4", "#3DE25B", "#0b6e4f"]}
              margin={{ top: 20, right: 160, bottom: 10, left: 10 }}
              width={400}
            />
          </ChartContainer>

          <ChartContainer text="Total training minutes by day of the week in a month">
            <ActivityBarChart
              chartData={trainingBarChartData}
              maxMinutes={maxMinutes}
              series={series}
            />
          </ChartContainer>
        </div>

        <div className="flex gap-4 w-full">
          <ChartContainer text="Exercises distribution by month">
            <ActivityPieChart
              chartData={strengthChartData}
              height={300}
              margin={{ top: 20, right: 200, bottom: 10, left: 10 }}
              width={500}
            />
          </ChartContainer>
          <ChartContainer text="Exercises distribution by month">
            <ActivityPieChart
              chartData={gimnasticsChartData}
              colorPalette={[
                "#2ecc71",
                "#28b463",
                "#1d8348",
                "#0b6e4f",
                "#0a5348",
              ]}
              margin={{ top: 20, right: 200, bottom: 10, left: 10 }}
              width={500}
            />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Analytics);
