import { useEffect, useState } from "react";

import { setFavorites } from "@/redux/favoritesReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import DataService from "@/service/data.service";

const useFavorites = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const trainingList =
    useAppSelector((state) => state.favorites.favoriteList) || [];

  useEffect(() => {
    const getTraining = async () => {
      setLoading(true);
      const dataService = new DataService();
      const data = await dataService.getCollection("favorites");

      const transformedData = data.map((item: any) => ({
        id: item.id,
        training: item.training || {},
        date: item.date || new Date().toISOString(),
      }));

      // Sort by date
      transformedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      dispatch(setFavorites(transformedData));
      setLoading(false);
    };

    getTraining();
  }, [dispatch]);

  // Filter the training list by category
  const filteredTrainingList = trainingList
    .filter(
      (training) => category === "All" || training.training?.type === category
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const paginatedTrainingList = filteredTrainingList.slice(
    startIndex,
    endIndex
  );

  return {
    category,
    setCategory,
    paginatedTrainingList,
    loading,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(filteredTrainingList.length / itemsPerPage),
  };
};

export { useFavorites };
