import { axisClasses } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "next-themes";

interface ActivityBarChartProps {
  chartData: any;
  series: any;
  maxMinutes: number;
  colorMap?: Record<string, string>;
}

const defaultColorMap: Record<string, string> = {
  Hyrox: "#76d7c4",
  Crossfit: "#2ecc71",
  Endurance: "#0b6e4f",
};

const ActivityBarChart = ({
  chartData,
  series,
  maxMinutes,
  colorMap = defaultColorMap,
}: ActivityBarChartProps) => {
  const { theme } = useTheme();
  const legendFill =
    theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)";
  const overlayFill =
    theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";
  const axisFill = theme === "dark" ? "white" : "black";

  const updatedSeries = series.map((serie: any) => ({
    ...serie,
    color: colorMap[serie.label] || "#95a5a6",
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
            fill: legendFill,
          },
        },
        noDataOverlay: {
          style: {
            fontSize: "16px",
            fill: overlayFill,
          },
        },
        loadingOverlay: {
          style: {
            fontSize: "16px",
            fill: overlayFill,
          },
        },
      }}
      sx={{
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: axisFill,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: axisFill,
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
            fill: axisFill,
          },
        },
      ]}
      yAxis={[
        {
          labelStyle: {
            fill: axisFill,
            fontSize: 16,
          },
          label: "( Minutes )",
          scaleType: "linear",
          tickSize: 1,
          min: 0,
          max: maxMinutes,
          tickLabelStyle: {
            fill: axisFill,
            fontSize: 12,
          },
        },
      ]}
    />
  );
};

export default ActivityBarChart;
