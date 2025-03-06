import { axisClasses } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "next-themes";

import { colorMap } from "@/constants";

interface BarChartProps {
  chartData: any;
  series: any;
  maxMinutes: number;
}

const TrainingStackedBarChart = ({
  chartData,
  series,
  maxMinutes,
}: BarChartProps) => {
  const { theme } = useTheme();
  const darkMode = theme === "dark" ? "white" : "black";

  const updatedSeries = series.map((serie: any) => ({
    ...serie,
    color: colorMap[serie.label] || "gray",
  }));

  return (
    <BarChart
      borderRadius={2}
      dataset={chartData}
      height={300}
      margin={{ top: 40, right: 20, bottom: 20, left: 60 }}
      series={updatedSeries}
      slotProps={{
        legend: {
          hidden: true,
        },
        noDataOverlay: {
          style: {
            fontSize: "16px",
            fill: "rgba(255, 255, 255, 0.7)",
          },
        },
        loadingOverlay: {
          style: {
            fontSize: "16px",
            fill: "rgba(255, 255, 255, 0.7)",
          },
        },
      }}
      sx={{
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: darkMode,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: darkMode,
          },
        },
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translateX(-10px)",
        },
      }}
      width={700}
      xAxis={[
        {
          scaleType: "band",
          data: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          tickLabelStyle: {
            fill: darkMode,
          },
        },
      ]}
      yAxis={[
        {
          labelStyle: {
            fill: darkMode,
            fontSize: 16,
          },
          label: "( Minutes )",
          scaleType: "linear",
          tickSize: 1,
          min: 0,
          max: maxMinutes,
          tickLabelStyle: {
            fill: darkMode,
            fontSize: 12,
          },
        },
      ]}
    />
  );
};

export default TrainingStackedBarChart;
