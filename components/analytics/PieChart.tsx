import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { useTheme } from "next-themes";

interface ActivityPieChartProps {
  chartData: { id: string; value: number; label: string }[];
  colorMap?: Record<string, string>;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const defaultColorMap: Record<string, string> = {
  Hyrox: "#76d7c4",
  Crossfit: "#2ecc71",
  Endurance: "#0b6e4f",
};

const ActivityPieChart = ({
  chartData,
  width = 400,
  height = 300,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  colorMap = defaultColorMap,
}: ActivityPieChartProps) => {
  const { theme } = useTheme();
  const legendFill =
    theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)";
  const overlayFill =
    theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";

  const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

  const pieChartDataWithColors = chartData.map((item) => ({
    ...item,
    color: colorMap[item.label] || "#95a5a6",
  }));

  return (
    <PieChart
      height={height}
      margin={margin}
      series={[
        {
          arcLabel: (item) => {
            const percentage = ((item.value / totalValue) * 100).toFixed(1);

            return `${percentage}%`;
          },
          arcLabelMinAngle: 35,
          arcLabelRadius: "63%",
          data: pieChartDataWithColors,
          highlightScope: { fade: "global", highlight: "item" },
        },
      ]}
      slotProps={{
        legend: {
          position: {
            vertical: "middle",
            horizontal: "right",
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
        [`& .${pieArcLabelClasses.root}`]: {
          fontSize: "20px",
          fill: "white",
          textAnchor: "middle",
          whiteSpace: "pre-line",
        },
      }}
      width={width}
    />
  );
};

export default ActivityPieChart;
