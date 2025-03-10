"use client";

import { Spinner } from "@nextui-org/spinner";

import { TrainingForm } from "@/components/forms/Form";
import withAuth from "@/components/hoc/withAuth";
import { Training } from "@/components/trainings/Training";
import useTraining from "@/hooks/useTraining";

const isEmptyTraining = (training: any) => {
  if (!training) return true;

  return Object.values(training).every((value) => value === "");
};

function Create() {
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
        <div className="flex justify-center items-center h-80">
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

export default withAuth(Create);
