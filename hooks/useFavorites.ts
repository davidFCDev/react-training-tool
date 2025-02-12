/* eslint-disable no-console */
import { useEffect, useState } from "react";

import { setFavorites } from "@/app/redux/favoritesReducer";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import DataService from "@/app/service/data.service";

const useFavorites = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("All");

  const trainingList =
    useAppSelector((state) => state.favorites.favoriteList) || [];

  useEffect(() => {
    const getTraining = async () => {
      const dataService = new DataService();
      const data = await dataService.getCollection("favorites");

      dispatch(setFavorites(data));
    };

    getTraining();
  }, [dispatch]);

  const filteredTrainingList = trainingList
    .map((training) => {
      try {
        const parsedTraining =
          typeof training.training === "string"
            ? JSON.parse(training.training)
            : training.training;

        return { ...training, parsedTraining };
      } catch (error) {
        console.error("Error parsing training data:", error);

        return null;
      }
    })
    .filter(
      (training) =>
        training &&
        (category === "All" || training.parsedTraining.type === category)
    );

  return { category, setCategory, filteredTrainingList };
};

export { useFavorites };
