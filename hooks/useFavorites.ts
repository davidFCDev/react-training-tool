/* eslint-disable no-console */
import { useEffect, useState } from "react";

import { setFavorites } from "@/redux/favoritesReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import DataService from "@/service/data.service";

const useFavorites = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const trainingList =
    useAppSelector((state) => state.favorites.favoriteList) || [];

  useEffect(() => {
    const getTraining = async () => {
      setLoading(true);
      const dataService = new DataService();
      const data = await dataService.getCollection("favorites");
      const transformedData = data.map((item: any) => ({
        id: item.id,
        training: item.training || "",
        date: item.date || new Date().toISOString(),
      }));

      dispatch(setFavorites(transformedData));
      setLoading(false);
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

  return { category, setCategory, filteredTrainingList, loading };
};

export { useFavorites };
