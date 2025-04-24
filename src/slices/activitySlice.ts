import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SET_TYPE } from "../types.ts";

interface ISet {
  type: SET_TYPE;
  reps: number;
  weight: number;
}

interface IActivityState {
  [exercise: string]: ISet[];
}

const initialState: IActivityState = {};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addSetToExercise: (
      state,
      action: PayloadAction<{ exercise: string; set: ISet }>
    ) => {
      const { exercise, set } = action.payload;
      state[exercise] = [...(state[exercise] || []), set];
    },
    clearExerciseSets: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addSetToExercise, clearExerciseSets } = activitySlice.actions;

export default activitySlice.reducer;
