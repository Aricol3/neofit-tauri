import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "../store";

export interface IUserProfile {
  age: number;
  gender: "male" | "female";
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  caloriesNeeded: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
}

interface ProfileState {
  profile: IUserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IUserProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setProfile,
  clearProfile,
  setProfileLoading,
  setProfileError
} = profileSlice.actions;

export const selectUserProfile = (state: IRootState) => state.profile.profile;
export const selectProfileLoading = (state: IRootState) => state.profile.loading;
export const selectProfileError = (state: IRootState) => state.profile.error;

export default profileSlice.reducer;
