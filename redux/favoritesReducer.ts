import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Training {
  id: string;
  training: Record<string, any>;
}

export interface TrainingState {
  favoriteList: Training[];
}

const initialState: TrainingState = {
  favoriteList: [],
};

export const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Training>) => {
      state.favoriteList.push(action.payload);
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== action.payload
      );
    },

    setFavorites: (state, action: PayloadAction<Training[]>) => {
      state.favoriteList = action.payload;
    },

    updateFavorite: (state, action: PayloadAction<Training>) => {
      const index = state.favoriteList.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.favoriteList[index] = action.payload;
      }
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, updateFavorite } =
  favoritesReducer.actions;
export default favoritesReducer.reducer;
