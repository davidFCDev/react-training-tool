/* eslint-disable no-console */
import { Training } from "./Training";

interface FilteredTrainingListProps {
  trainingList: any[];
}

export const FilteredTrainingList = ({
  trainingList,
}: FilteredTrainingListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {trainingList.length > 0 ? (
        trainingList.map((training) => {
          return (
            <Training
              key={training.id}
              fetchedWod={training.parsedTraining}
              id={training.id}
              setFetchedWod={() => {}}
            />
          );
        })
      ) : (
        <div className="col-span-3 flex flex-col items-center justify-center">
          <p className="text-zinc-300">No workouts found for this category.</p>
        </div>
      )}
    </div>
  );
};
