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
    updateMealEntry: (
      state,
      action: PayloadAction<{ meal: string; entry: IMealEntry }>
    ) => {
      const { meal, entry } = action.payload;

      for (const m in state.mealEntries) {
        state.mealEntries[m] = state.mealEntries[m].filter((e) => e.id !== entry.id);
      }

      state.mealEntries[meal] = [...(state.mealEntries[meal] || []), entry];
    },
    removeMealEntry: (
      state,
      action: PayloadAction<{ meal: string; entryId: string }>
    ) => {
      const { meal, entryId } = action.payload;
      console.log("CEEEE", state.mealEntries[meal]);
      state.mealEntries[meal] = state.mealEntries[meal].filter(
        (entry) => entry.id !== entryId
      );
    }
  }
});

export const { setScannedBarcode, setScannedFood, addMealEntry, updateMealEntry, removeMealEntry } =
  nutritionSlice.actions;

export default nutritionSlice.reducer;
