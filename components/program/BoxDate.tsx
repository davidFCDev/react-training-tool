import { AddIcon } from "../common/icons";

import { BoxDateProps } from "@/types";

const BoxDate = ({
  isPlaceholder,
  isSunday,
  dayIndex,
  training,
  onClick,
}: BoxDateProps) => {
  // Definir colores según el tipo de entrenamiento
  const trainingColors: Record<string, string> = {
    crossfit: "bg-success-400",
    hyrox: "bg-success-600",
    endurance: "bg-lime-300",
  };

  // Determinar el color de fondo
  const backgroundColor =
    training && "type" in training
      ? (training.type && trainingColors[training.type.toLowerCase()]) ||
        "bg-zinc-800"
      : isSunday
        ? "bg-zinc-900"
        : "bg-zinc-800";

  return (
    <div
      className={`${training ? "border-zinc-500 text-zinc-900" : "border-zinc-800 text-white"} hover:scale-105 border flex flex-col items-center justify-center rounded-lg h-40 w-40 shadow-md relative transition-all cursor-pointer 
        ${isPlaceholder ? "bg-zinc-800 opacity-50 " : backgroundColor} 
        ${training && isSunday ? "border-zinc-300" : ""} 

`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      {!isPlaceholder && (
        <>
          <span
            className={` tracking-wider anton-regular absolute top-2 left-2`}
          >
            {dayIndex}
          </span>
          {training ? (
            <div className="flex flex-col items-center justify-center">
              {"type" in training && (
                <p className="text-center font-bold text-lg uppercase">
                  {training.type}
                </p>
              )}
              {"time" in training && (
                <p className="text-sm bg-zinc-700 text-zinc-200 rounded-md px-2 py-1 absolute top-2 right-2">
                  {training.time}&apos;
                </p>
              )}
              {"name" in training && (
                <p className="text-sm absolute bottom-2 w-full px-2 text-center">
                  {training.name}
                </p>
              )}
            </div>
          ) : (
            <button>
              <AddIcon size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BoxDate;
