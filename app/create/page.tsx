"use client";

import { Spinner } from "@nextui-org/spinner";

import { TrainingForm } from "@/components/Form";
import { Training } from "@/components/Training";
import useTraining from "@/hooks/useTraining";

const isEmptyTraining = (training: any) => {
  if (!training) return true;

  return Object.values(training).every((value) => value === "");
};

export default function Create() {
  const { getTraining, loading, fetchedTraining, setFetchedTraining } =
    useTraining();

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      {/* Show form if there is not a training */}
      {!loading && (!fetchedTraining || isEmptyTraining(fetchedTraining)) && (
        <TrainingForm
          loading={loading}
          setFetchedWod={setFetchedTraining}
          onSubmit={getTraining}
        />
      )}

      {/* Show loading spinner */}
      {loading && (
        <div className="flex gap-4">
          <Spinner color="success" size="lg" />
        </div>
      )}

      {/* Show training if training exists */}
      {!loading && fetchedTraining && !isEmptyTraining(fetchedTraining) && (
        <div className="min-w-80">
          <Training
            fetchedWod={fetchedTraining}
            id=""
            isNotFavorite={true}
            setFetchedWod={setFetchedTraining}
          />
        </div>
      )}
    </div>
  );
}
