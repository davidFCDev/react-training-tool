/* eslint-disable no-console */
"use client";

import { Spinner } from "@nextui-org/spinner";
import { AnimatePresence, motion } from "framer-motion";

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
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="spinner"
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-4"
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <Spinner color="success" size="lg" />
            </motion.div>
          ) : (
            <motion.div
              key="trainingList"
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <FilteredTrainingList trainingList={filteredTrainingList} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default withAuth(Favorites);
