import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SET_TYPE } from "../types.ts";
import { IRootState } from "../store.ts";

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
  activities: {
    [date: string]: IActivity[];
  };
}

const initialState: ActivityState = {
  activities: {}
};

export const selectActivitiesForDate = (state: IRootState, date: string) =>
  state.activity.activities[date] || [];

export const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    addActivity: (
      state,
      action: PayloadAction<{ date: string; activity: IActivity }>
    ) => {
      const { date, activity } = action.payload;
      if (!state.activities[date]) {
        state.activities[date] = [];
      }
      state.activities[date].push(activity);
    },
    updateActivity: (
      state,
      action: PayloadAction<{
        date: string;
        id: string;
        updated: Partial<IActivity>;
      }>
    ) => {
      const { date, id, updated } = action.payload;
      const activities = state.activities[date];
      if (!activities) return;
      const index = activities.findIndex((a) => a.id === id);
      if (index !== -1) {
        activities[index] = { ...activities[index], ...updated };
      }
    },
    deleteActivity: (
      state,
      action: PayloadAction<{ date: string; id: string }>
    ) => {
      const { date, id } = action.payload;
      const dayActivities = state.activities[date];
      if (!dayActivities) return;

      state.activities[date] = dayActivities.filter(
        (activity) => activity.id !== id
      );
    },
    addSetToActivity: (
      state,
      action: PayloadAction<{
        date: string;
        activityId: string;
        newSet: ISet;
      }>
    ) => {
      const { date, activityId, newSet } = action.payload;
      const activity = state.activities[date]?.find(
        (a) => a.id === activityId
      );
      if (activity) {
        activity.sets.push(newSet);
      }
    },
    resetActivitiesState: () => initialState
  }
});

export const {
  addActivity,
  updateActivity,
  addSetToActivity,
  deleteActivity,
  resetActivitiesState
} = activitySlice.actions;
export default activitySlice.reducer;
