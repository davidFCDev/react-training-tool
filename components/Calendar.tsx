import BoxDate from "./BoxDate";

import { CalendarProps } from "@/types";

const Calendar = ({
  days,
  trainingSchedule,
  handleDateClick,
}: CalendarProps) => {
  return (
    <>
      {days.map(
        ({
          dayIndex,
          isPlaceholder,
          isSunday,
          date,
        }: {
          dayIndex: number;
          isPlaceholder: boolean;
          isSunday: boolean;
          date: string;
        }) => {
          const training = trainingSchedule[date]?.training || null;

          return (
            <BoxDate
              key={date}
              dayIndex={dayIndex}
              isPlaceholder={isPlaceholder}
              isSunday={isSunday}
              training={training}
              onClick={() => handleDateClick(dayIndex)}
            />
          );
        }
      )}
    </>
  );
};

export default Calendar;
