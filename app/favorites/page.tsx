/* eslint-disable no-console */
"use client";

import { Spinner } from "@nextui-org/spinner";

import { FilterButtons } from "@/components/common/FilterButtons";
import withAuth from "@/components/hoc/withAuth";
import { FilteredTrainingList } from "@/components/trainings/FilteredTrainingList";
import { useFavorites } from "@/hooks/useFavorites";

function Favorites() {
  const { category, setCategory, filteredTrainingList, loading } =
    useFavorites();

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <div>
        <h1 className="title">
          Workouts
          <span className="text-success"> List</span>
        </h1>
        <p className="subtitle">Here you can find all your saved workouts</p>
      </div>
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
