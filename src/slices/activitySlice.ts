import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SET_TYPE } from "../types.ts";

export interface ISet {
  type: SET_TYPE;
  reps: number;
  weight: number;
}

export interface IActivity {
  id: string;
  exercise: string;
  sets: ISet[];
  isEditing: boolean,
}

interface ActivityState {
  activities: IActivity[];
}

const initialState: ActivityState = {
  activities: []
};

export const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<IActivity>) => {
      state.activities.push(action.payload);
    },
    updateActivity: (
      state,
      action: PayloadAction<{ id: string; updated: Partial<IActivity> }>
    ) => {
      const index = state.activities.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = {
          ...state.activities[index],
          ...action.payload.updated
        };
      }
    },
    addSetToActivity: (
      state,
      action: PayloadAction<{ activityId: string; newSet: ISet }>
    ) => {
      const activity = state.activities.find(a => a.id === action.payload.activityId);
      if (activity) {
        activity.sets.push(action.payload.newSet);
      }
    },
    resetActivitiesState: () => initialState
  }
});

export const { addActivity, updateActivity, addSetToActivity, resetActivitiesState } = activitySlice.actions;
export default activitySlice.reducer;
