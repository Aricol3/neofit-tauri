import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMealEntry, IScannedFood } from "../types.ts";

interface INutritionState {
  scannedBarcode: string;
  scannedFood: IScannedFood | null;
  mealEntries: {
    [meal: string]: IMealEntry[];
  };
}

const initialState: INutritionState = {
  scannedBarcode: "",
  scannedFood: null,
  mealEntries: {
    Breakfast: [],
    Snacks: [],
    Lunch: [],
    Dinner: []
  }
};

export const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    setScannedBarcode: (state, action: PayloadAction<string>) => {
      state.scannedBarcode = action.payload;
    },
    setScannedFood: (state, action: PayloadAction<IScannedFood>) => {
      state.scannedFood = action.payload;
    },
    addMealEntry: (
      state,
      action: PayloadAction<{ meal: string; entry: IMealEntry }>
    ) => {
      const { meal, entry } = action.payload;
      state.mealEntries[meal] = [...(state.mealEntries[meal] || []), entry];
    },
    removeMealEntry: (
      state,
      action: PayloadAction<{ meal: string; entryId: number }>
    ) => {
      const { meal, entryId } = action.payload;
      state.mealEntries[meal] = state.mealEntries[meal].filter(
        (entry) => entry.id !== entryId
      );
    }
  }
});

export const { setScannedBarcode, setScannedFood, addMealEntry, removeMealEntry } =
  nutritionSlice.actions;

export default nutritionSlice.reducer;
