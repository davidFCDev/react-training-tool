/* eslint-disable no-console */
"use client";
import { useEffect } from "react";

import { setFavorites } from "../redux/favoritesReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import DataService from "../service/data.service";

import { Training } from "@/components/Training";

export default function Favorites() {
  const dispatch = useAppDispatch();

  const trainingList =
    useAppSelector((state) => state.favorites.favoriteList) || [];

  const getTraining = async () => {
    const dataService = new DataService();
    const data = await dataService.getCollection("favorites");

    dispatch(setFavorites(data));
  };

  useEffect(() => {
    getTraining();
  }, [dispatch]);

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Favorites</h1>
      <p className="text-lg text-gray-300">Your favorite workouts</p>
      <div className="grid grid-cols-2 gap-4 w-full mt-10">
        {trainingList.length > 0 ? (
          trainingList.map((training) => {
            let parsedTraining;

            try {
              parsedTraining =
                typeof training.training === "string"
                  ? JSON.parse(training.training)
                  : training.training;
            } catch (error) {
              console.error("Error parsing training data:", error);
              parsedTraining = {};
            }

            return (
              <Training
                key={training.id}
                fetchedWod={parsedTraining}
                id={training.id}
                setFetchedWod={() => {}}
              />
            );
          })
        ) : (
          <div className="col-span-2">
            <p className="text-lg text-gray-500">
              You don&apos;t have any favorite workouts yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
