import { daysOfWeek } from "@/constants";

const DaysOfWeek = () => {
  return (
    <>
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="bg-zinc-900 flex flex-col items-center justify-center rounded-lg p-4 h-12 w-40 shadow-md font-semibold"
        >
          {day}
        </div>
      ))}
    </>
  );
};

export default DaysOfWeek;
