import { useTheme } from "next-themes";

import { colorMap } from "@/constants";

interface LegendProps {
  trainingCounts: Record<string, number>;
}

const Legend: React.FC<LegendProps> = ({ trainingCounts }) => {
  // If a new training type is added to `colorMap`, it will be displayed in the legend
  const defaultTrainingTypes = Object.keys(colorMap); // ["Crossfit", "Hyrox", "Endurance"]

  const theme = useTheme();

  return (
    <div className="flex items-center gap-2">
      {defaultTrainingTypes.map((type) => (
        <div
          key={type}
          className={`${theme.theme === "dark" ? "text-white bg-zinc-800 border-zinc-600" : "text-black bg-zinc-100 border-zinc-300"} flex items-center gap-2 p-4 rounded-lg border `}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colorMap[type] }}
          />
          <p>{type}</p>
          <p>{trainingCounts[type] !== undefined ? trainingCounts[type] : 0}</p>
        </div>
      ))}
    </div>
  );
};

export default Legend;
