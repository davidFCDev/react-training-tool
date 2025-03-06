import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

import { colorMap } from "@/constants";

interface TrainingPieChartProps {
  chartData: { id: string; value: number; label: string }[];
}

const TrainingPieChart = ({ chartData }: TrainingPieChartProps) => {
  const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

  const pieChartDataWithColors = chartData.map((item) => ({
    ...item,
    color: colorMap[item.label] || "gray",
  }));

  return (
    <PieChart
      height={300}
      margin={{ top: 30, right: 10, bottom: 10, left: 10 }}
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
        [`& .${pieArcLabelClasses.root}`]: {
          fontSize: "20px",
          fill: "white",
          textAnchor: "middle",
          whiteSpace: "pre-line",
        },
      }}
      width={300}
    />
  );
};

export default TrainingPieChart;
