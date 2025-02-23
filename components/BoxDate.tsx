import { AddIcon } from "./icons";

interface BoxDateProps {
  isPlaceholder: boolean;
  isSunday: boolean;
  dayIndex: number;
  training?: any;
  onClick: () => void;
}

const BoxDate = ({
  isPlaceholder,
  isSunday,
  dayIndex,
  training,
  onClick,
}: BoxDateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg p-4 h-40 w-40 shadow-md relative hover:bg-zinc-700 transition-all cursor-pointer 
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
          <span className="absolute top-2 left-2 text-gray-300 tracking-wider anton-regular">
            {dayIndex}
          </span>
          {training ? (
            <div>
              <p className="text-white text-center">
                {training.parsedTraining.type}
              </p>
              <p className="font-light text-xs">
                {training.parsedTraining.time} mins
              </p>
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
