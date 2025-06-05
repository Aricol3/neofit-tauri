import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMealEntry } from "../types";
import { nutritionSlice } from "./nutritionSlice";
import { AppDispatch, IRootState } from "../store.ts";
import { activitySlice, IActivity, ISet } from "./activitySlice.ts";
import {
  loginFailure,
  loginStart,
  loginSuccess, logout,
  registerFailure,
  registerStart,
  registerSuccess, updateAccessToken
} from "./authSlice.ts";
import { login, refreshAccessToken, register } from "../api/authApi.ts";

const { addMealEntry, updateMealEntry, removeMealEntry, setWaterIntake } = nutritionSlice.actions;

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

export const setWaterIntakeWithSelectedDay = createAsyncThunk(
  "nutrition/setWaterIntakeWithSelectedDay",
  async (filledCups: number, { getState, dispatch }) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(setWaterIntake({ date, filledCups }));
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

export const performLogin = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    const data = await login(email, password);
    dispatch(loginSuccess({ user: data.user, accessToken: data.accessToken }));
  } catch (err: any) {
    dispatch(loginFailure(err.message || "Login failed"));
  }
};

export const performRegister = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerStart());
    await register(email, password);
    dispatch(registerSuccess());
  } catch (err: any) {
    dispatch(registerFailure(err.message || "Registration failed"));
  }
};