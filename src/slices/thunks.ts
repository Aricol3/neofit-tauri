import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMealEntry } from "../types";
import { nutritionSlice } from "./nutritionSlice";
import { IRootState } from "../store.ts";
import { activitySlice, IActivity, ISet } from "./activitySlice.ts";

const { addMealEntry, updateMealEntry, removeMealEntry } = nutritionSlice.actions;

export const addMealEntryWithSelectedDay = createAsyncThunk(
  "nutrition/addMealEntryWithSelectedDate",
  async (
    { meal, entry }: { meal: string; entry: IMealEntry },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(addMealEntry({ meal, entry, date }));
  }
);

export const updateMealEntryWithSelectedDay = createAsyncThunk(
  "nutrition/updateMealEntryWithSelectedDate",
  async (
    { meal, entry }: { meal: string; entry: IMealEntry },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(updateMealEntry({ meal, entry, date }));
  }
);

export const removeMealEntryWithSelectedDay = createAsyncThunk(
  "nutrition/removeMealEntryWithSelectedDate",
  async (
    { meal, entryId }: { meal: string; entryId: string },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(removeMealEntry({ meal, entryId, date }));
  }
);


const {
  addActivity,
  updateActivity,
  deleteActivity,
  addSetToActivity
} = activitySlice.actions;

export const addActivityWithSelectedDay = createAsyncThunk(
  "activity/addActivityWithSelectedDay",
  async (activity: IActivity, { getState, dispatch }) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(addActivity({ date, activity }));
  }
);

export const updateActivityWithSelectedDay = createAsyncThunk(
  "activity/updateActivityWithSelectedDay",
  async (
    { id, updated }: { id: string; updated: Partial<IActivity> },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(updateActivity({ date, id, updated }));
  }
);

export const deleteActivityWithSelectedDay = createAsyncThunk(
  "activity/deleteActivityWithSelectedDay",
  async (activityId: string, { getState, dispatch }) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(deleteActivity({ date, id: activityId }));
  }
);

export const addSetToActivityWithSelectedDay = createAsyncThunk(
  "activity/addSetToActivityWithSelectedDay",
  async (
    { activityId, newSet }: { activityId: string; newSet: ISet },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(addSetToActivity({ date, activityId, newSet }));
  }
);
