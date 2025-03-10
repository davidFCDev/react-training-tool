import { AddIcon } from "../common/icons";

import { BoxDateProps } from "@/types";

const BoxDate = ({
  isPlaceholder,
  isSunday,
  dayIndex,
  training,
  onClick,
}: BoxDateProps) => {
  return (
    <div
      className={`${training ? "border-zinc-500" : "border-zinc-800 "} border-b border-r flex flex-col items-center justify-center rounded-lg p-4 h-40 w-40 shadow-md relative hover:bg-zinc-700 transition-all cursor-pointer 
        ${isPlaceholder ? "bg-zinc-800 opacity-50" : isSunday ? "bg-success" : "bg-zinc-800"}`}
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
            className={`${isSunday ? "text-zinc-700" : "text-white"} tracking-wider anton-regular absolute top-2 left-2`}
          >
            {dayIndex}
          </span>
          {training ? (
            <div>
              <p className="text-white text-center">{training.type}</p>
              <p className="font-light text-xs">{training.time} mins</p>
            </div>
          ) : (
            <button className={`${isSunday ? "text-zinc-700" : "text-white"}`}>
              <AddIcon size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BoxDate;
