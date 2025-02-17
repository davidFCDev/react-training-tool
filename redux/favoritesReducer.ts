import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteTraining {
  id: string;
  training: string;
}

export interface TrainingState {
  favoriteList: FavoriteTraining[];
}

const initialState: TrainingState = {
  favoriteList: [],
};

export const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteTraining>) => {
      const newFavorite = {
        id: action.payload.id,
        training: action.payload.training,
      };

      state.favoriteList.push(newFavorite);
    },

    removeFavorite: (state, action) => {
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== action.payload
      );
    },

    setFavorites: (state, action) => {
      state.favoriteList = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesReducer.actions;
export default favoritesReducer.reducer;
