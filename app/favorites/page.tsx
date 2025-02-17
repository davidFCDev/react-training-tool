/* eslint-disable no-console */
"use client";

import { Spinner } from "@nextui-org/spinner";

import { FilterButtons } from "@/components/FilterButtons";
import { FilteredTrainingList } from "@/components/FilteredTrainingList";
import withAuth from "@/hoc/withAuth";
import { useFavorites } from "@/hooks/useFavorites";

function Favorites() {
  const { category, setCategory, filteredTrainingList, loading } =
    useFavorites();

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Workouts</h1>
      <p className="text-lg text-gray-300">Your favorite trainings</p>
      <FilterButtons category={category} setCategory={setCategory} />
      <div className="mt-10">
        {loading ? (
          <div className="flex gap-4">
            <Spinner color="success" size="lg" />
          </div>
        ) : (
          <FilteredTrainingList trainingList={filteredTrainingList} />
        )}
      </div>
    </div>
  );
}

export default withAuth(Favorites);
