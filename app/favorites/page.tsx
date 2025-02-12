/* eslint-disable no-console */
"use client";

import { FilterButtons } from "@/components/FilterButtons";
import { FilteredTrainingList } from "@/components/FilteredTrainingList";
import { useFavorites } from "@/hooks/useFavorites";

export default function Favorites() {
  const { category, setCategory, filteredTrainingList } = useFavorites();

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Favorites</h1>
      <p className="text-lg text-gray-300">Your favorite workouts</p>
      <FilterButtons category={category} setCategory={setCategory} />
      <FilteredTrainingList trainingList={filteredTrainingList} />
    </div>
  );
}
