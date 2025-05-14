import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMealEntry } from '../types';
import { nutritionSlice } from './nutritionSlice';
import { IRootState } from "../store.ts";

const { addMealEntry, updateMealEntry, removeMealEntry } = nutritionSlice.actions;

export const addMealEntryWithSelectedDay = createAsyncThunk(
  'nutrition/addMealEntryWithSelectedDate',
  async (
    { meal, entry }: { meal: string; entry: IMealEntry },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(addMealEntry({ meal, entry, date }));
  }
);

export const updateMealEntryWithSelectedDay = createAsyncThunk(
  'nutrition/updateMealEntryWithSelectedDate',
  async (
    { meal, entry }: { meal: string; entry: IMealEntry },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(updateMealEntry({ meal, entry, date }));
  }
);

export const removeMealEntryWithSelectedDay = createAsyncThunk(
  'nutrition/removeMealEntryWithSelectedDate',
  async (
    { meal, entryId }: { meal: string; entryId: string },
    { getState, dispatch }
  ) => {
    const date = (getState() as IRootState).general.selectedDay;
    dispatch(removeMealEntry({ meal, entryId, date }));
  }
);
