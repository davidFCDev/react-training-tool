import { axisClasses } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "next-themes";

interface ActivityBarChartProps {
  chartData: any;
  series: any;
  maxMinutes: number;
  colorPalette?: string[];
}

const defaultBarChartPalette = ["#76d7c4", "#3DE25B", "#0b6e4f"];

const ActivityBarChart = ({
  chartData,
  series,
  maxMinutes,
  colorPalette = defaultBarChartPalette,
}: ActivityBarChartProps) => {
  const { theme } = useTheme();
  const darkMode = theme === "dark" ? "white" : "black";

  const updatedSeries = series.map((serie: any, index: number) => ({
    ...serie,
    color: colorPalette[index % colorPalette.length],
  }));

  return (
    <BarChart
      borderRadius={2}
      dataset={chartData}
      height={300}
      margin={{ top: 60, right: 20, bottom: 20, left: 60 }}
      series={updatedSeries}
      slotProps={{
        legend: {
          position: {
            vertical: "top",
            horizontal: "middle",
          },
          itemMarkWidth: 16,
          itemMarkHeight: 5,
          markGap: 10,
          itemGap: 20,
          labelStyle: {
            fontSize: 16,
            fill: "rgba(255, 255, 255, 0.9)",
          },
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
      width={600}
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

export default ActivityBarChart;
