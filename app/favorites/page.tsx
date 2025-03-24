/* eslint-disable no-console */
"use client";

import { Pagination } from "@heroui/pagination";
import { Spinner } from "@nextui-org/spinner";
import { AnimatePresence, motion } from "framer-motion";

import { FilterButtons } from "@/components/common/FilterButtons";
import withAuth from "@/components/hoc/withAuth";
import { FilteredTrainingList } from "@/components/trainings/FilteredTrainingList";
import { useFavorites } from "@/hooks/useFavorites";

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function Favorites() {
  const {
    category,
    setCategory,
    paginatedTrainingList,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useFavorites();

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <h1 className="title">
        Workouts<span className="text-success"> List</span>
      </h1>
      <p className="subtitle">Here you can find all your saved workouts</p>

      <FilterButtons
        category={category}
        setCategory={setCategory}
        setCurrentPage={setCurrentPage}
      />

      <div className="mt-4 min-h-[350px] flex justify-center items-start">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="spinner"
              {...pageTransition}
              className="flex gap-4"
            >
              <Spinner color="success" size="lg" />
            </motion.div>
          ) : (
            <motion.div
              key={currentPage}
              {...pageTransition}
              className="w-full"
            >
              {paginatedTrainingList.length > 0 ? (
                <FilteredTrainingList trainingList={paginatedTrainingList} />
              ) : (
                <p className="text-zinc-300 text-center">
                  No workouts found for this category.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔥 Mostrar la paginación solo si hay entrenamientos */}
      {paginatedTrainingList.length > 0 && (
        <Pagination
          className=""
          color="success"
          page={currentPage}
          size="sm"
          total={totalPages}
          variant="light"
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default withAuth(Favorites);
