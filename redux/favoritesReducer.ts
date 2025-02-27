import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Training, TrainingState } from "@/types";

const loadFavoritesFromStorage = (): Training[] => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favoriteList");

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  return [];
};

const initialState: TrainingState = {
  favoriteList: loadFavoritesFromStorage(),
};

export const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Training>) => {
      const exists = state.favoriteList.some(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.favoriteList.push({
          id: action.payload.id,
          date: action.payload.date,
          training: action.payload.training,
        });

        localStorage.setItem(
          "favoriteList",
          JSON.stringify(state.favoriteList)
        );
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
    },

    setFavorites: (state, action: PayloadAction<Training[]>) => {
      state.favoriteList = action.payload;
      localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
    },

    updateFavorite: (state, action: PayloadAction<Training>) => {
      const index = state.favoriteList.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.favoriteList[index] = {
          id: action.payload.id,
          date: action.payload.date,
          training: action.payload.training,
        };

        localStorage.setItem(
          "favoriteList",
          JSON.stringify(state.favoriteList)
        );
      }
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, updateFavorite } =
  favoritesReducer.actions;
export default favoritesReducer.reducer;
