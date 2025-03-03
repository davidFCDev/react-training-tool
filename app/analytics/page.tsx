/* eslint-disable no-console */
"use client";

import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";

import { MONTH_SELECT } from "@/constants";
import withAuth from "@/hoc/withAuth";
import DataService from "@/service/data.service";

function Analytics() {
  const [trainingCounts, setTrainingCounts] = useState({});
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataService = new DataService();
        const counts = await dataService.getTrainingCountByType(
          "programming",
          (data) => {
            if (selectedMonth === null) return true;
            const date = new Date(data.date);

            return date.getMonth() + 1 === selectedMonth;
          }
        );

        setTrainingCounts(counts);
      } catch (error) {
        console.error("Failed to fetch training counts:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const pieChartData = Object.entries(trainingCounts).map(([type, count]) => ({
    id: type,
    value: count as number,
    label: type,
  }));

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center p-4">
      <h1 className="title">Analytics</h1>
      <p className="subtitle">Check your progress and improve your results</p>

      <div className="mt-6 w-full max-w-sm">
        <Select
          label="Select a month"
          name="month-select"
          selectedKeys={
            selectedMonth !== null ? [String(selectedMonth)] : ["null"]
          }
          variant="faded"
          onChange={(e) => {
            const value = e.target.value;

            setSelectedMonth(value === "null" ? null : parseInt(value));
          }}
        >
          {MONTH_SELECT.map((month) => (
            <SelectItem
              key={String(month.value ?? "null")}
              aria-label={month.name}
            >
              {month.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="mt-6 w-full">
        <PieChart
          height={200}
          series={[
            {
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              data: pieChartData,
            },
          ]}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
              padding: 0,
              itemGap: 10,
              labelStyle: {
                fontSize: 16,
                fill: "white",
              },
            },
          }}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
              fontSize: 16,
              fill: "white",
            },
          }}
          width={350}
        />
      </div>
    </div>
  );
}

export default withAuth(Analytics);
