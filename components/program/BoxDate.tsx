import { AddIcon } from "../common/icons";

import { BoxDateProps } from "@/types";

// Define colors for each training type
const trainingColors: Record<string, string> = {
  crossfit: "bg-success-400",
  hyrox: "bg-success-600",
  endurance: "bg-lime-300",
};

// Get background color for the box
const getBackgroundColor = (isSunday: boolean, training?: any): string => {
  if (training?.type) {
    return trainingColors[training.type.toLowerCase()] || "bg-zinc-800";
  }

  return isSunday ? "bg-zinc-900" : "bg-zinc-800";
};

const BoxDate = ({
  isPlaceholder,
  isSunday,
  dayIndex,
  training,
  onClick,
}: BoxDateProps) => {
  const backgroundColor = getBackgroundColor(isSunday, training);
  const hasTraining = Boolean(training);

  return (
    <div
      aria-label={`Day ${dayIndex}${
        hasTraining && training && "type" in training
          ? ` - Training: ${training.type}`
          : ""
      }`}
      className={`
        flex flex-col items-center justify-center rounded-lg h-40 w-40 shadow-md relative transition-all cursor-pointer 
        hover:scale-105 ${backgroundColor} ${isPlaceholder ? "opacity-50" : ""}
        ${hasTraining ? "border-zinc-800 text-zinc-900 border-5" : "border-zinc-800 text-white border-1"}
      `}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      {!isPlaceholder && (
        <>
          <span className="tracking-wider anton-regular absolute top-2 left-2">
            {dayIndex}
          </span>

          {hasTraining ? (
            <div className="flex flex-col items-center justify-center w-full p-2">
              {training && "type" in training && training.type && (
                <p className="text-center font-bold text-xl">{training.type}</p>
              )}
              {training && "time" in training && training.time && (
                <p className="text-sm bg-zinc-800 text-zinc-300 rounded-md px-2 py-1 absolute top-2 right-2">
                  {training.time}&apos;
                </p>
              )}
              {training && "name" in training && training.name && (
                <p className="text-sm absolute bottom-7 truncate w-full text-center">
                  {training.name}
                </p>
              )}
            </div>
          ) : (
            <button aria-label="Add training">
              <AddIcon size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BoxDate;
