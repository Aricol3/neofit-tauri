import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMealEntry, IScannedFood } from "../types.ts";
import { IRootState } from "../store.ts";

const DEFAULT_CUP_SIZE_ML = 250;

interface INutritionState {
  scannedBarcode: string;
  scannedFood: IScannedFood | null;
  mealEntries: {
    [date: string]: {
      [meal: string]: IMealEntry[];
    };
  };
  cupSizeMl: number;
  waterIntake: {
    [date: string]: number;
  };
}

const initialState: INutritionState = {
  scannedBarcode: "",
  scannedFood: null,
  mealEntries: {},
  cupSizeMl: DEFAULT_CUP_SIZE_ML,
  waterIntake: {}
};

export const selectMealEntriesForDate = (state: IRootState, date: string) =>
  state.nutrition.mealEntries[date] || {
    Breakfast: [],
    Snacks: [],
    Lunch: [],
    Dinner: []
  };

export const selectWaterForDate = (state: IRootState, date: string) =>
  state.nutrition.waterIntake[date] || 0;


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
      action: PayloadAction<{ meal: string; entry: IMealEntry; date: string }>
    ) => {
      const { meal, entry, date } = action.payload;

      if (!state.mealEntries[date]) {
        state.mealEntries[date] = { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
      }

      state.mealEntries[date][meal] = [
        ...(state.mealEntries[date][meal] || []),
        entry
      ];
    },
    updateMealEntry: (
      state,
      action: PayloadAction<{ meal: string; entry: IMealEntry; date: string }>
    ) => {
      const { meal, entry, date } = action.payload;

      if (!state.mealEntries[date]) return;

      for (const m in state.mealEntries[date]) {
        state.mealEntries[date][m] = state.mealEntries[date][m].filter(e => e.id !== entry.id);
      }

      state.mealEntries[date][meal] = [
        ...(state.mealEntries[date][meal] || []),
        entry
      ];
    },
    removeMealEntry: (
      state,
      action: PayloadAction<{ meal: string; entryId: string; date: string }>
    ) => {
      const { meal, entryId, date } = action.payload;

      if (!state.mealEntries[date]) return;

      state.mealEntries[date][meal] = state.mealEntries[date][meal].filter(
        entry => entry.id !== entryId
      );
    },
    setWaterIntake: (
      state,
      action: PayloadAction<{ date: string; filledCups: number }>
    ) => {
      const { date, filledCups } = action.payload;
      state.waterIntake[date] = filledCups;
    },
    setCupSize: (state, action: PayloadAction<number>) => {
      state.cupSizeMl = action.payload;
    },
    resetNutritionState: () => initialState
  }
});

export const {
  setScannedBarcode,
  setScannedFood,
  addMealEntry,
  updateMealEntry,
  removeMealEntry,
  setWaterIntake,
  setCupSize,
  resetNutritionState
} =
  nutritionSlice.actions;

export default nutritionSlice.reducer;
