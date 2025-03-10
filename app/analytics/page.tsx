"use client";
import { useState } from "react";

import ActivityBarChart from "@/components/analytics/BarChart";
import ChartContainer from "@/components/analytics/ChartContainer"; // Importamos el nuevo componente
import MonthSelect from "@/components/analytics/MonthSelect";
import ActivityPieChart from "@/components/analytics/PieChart";
import withAuth from "@/components/hoc/withAuth";
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
      <p className="subtitle">Training and exercise distribution by month</p>

      <div className="mt-6 w-full flex items-center justify-center gap-4">
        <MonthSelect
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>

      <div className="w-full flex flex-col items-start mt-6 gap-4">
        <div className="flex gap-4 w-full">
          <ChartContainer text="Training type distribution by month">
            <ActivityPieChart
              chartData={trainingPieChartData}
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
          <ChartContainer text="Strength distribution by month">
            <ActivityPieChart
              chartData={strengthChartData}
              colorMap={{
                Clean: "#1abc9c",
                Snatch: "#16a085",
                "Back/Front Squat": "#2ecc71",
                "Push Press/Jerk": "#27ae60",
                "Clean & Jerk": "#0fb9b1",
                Deadlift: "#3498db",
              }}
              height={300}
              margin={{ top: 20, right: 200, bottom: 10, left: 10 }}
              width={500}
            />
          </ChartContainer>
          <ChartContainer text="Gimnastics distribution by month">
            <ActivityPieChart
              chartData={gimnasticsChartData}
              colorMap={{
                Core: "#1abc9c",
                "Bar Muscle Up": "#16a085",
                "Hand Stand": "#2ecc71",
                "Pull Up/C2B": "#27ae60",
                "Ring Muscle Up": "#0fb9b1",
              }}
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
