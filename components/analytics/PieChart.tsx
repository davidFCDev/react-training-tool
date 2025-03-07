import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

interface ActivityPieChartProps {
  chartData: { id: string; value: number; label: string }[];
  colorPalette?: string[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const defaultGreenPalette = [
  "#76d7c4",
  "#58d68d",
  "#2ecc71",
  "#28b463",
  "#1d8348",
];

const ActivityPieChart = ({
  chartData,
  width = 400,
  height = 300,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  colorPalette = defaultGreenPalette,
}: ActivityPieChartProps) => {
  const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

  const pieChartDataWithColors = chartData.map((item, index) => ({
    ...item,
    color: colorPalette[index % colorPalette.length],
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
