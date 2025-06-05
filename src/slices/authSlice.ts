import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
  registrationError: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  registrationSuccess: false,
  registrationError: null
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state) {
      state.registrationError = null;
      state.registrationSuccess = false;
      state.loading = true;
    },
    registerSuccess(state) {
      state.registrationSuccess = true;
      state.loading = false;
      state.registrationError = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.registrationError = action.payload;
      state.loading = false;
      state.registrationSuccess = false;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: IUser; accessToken: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.loading = false;
    },
    resetAuthState: () => initialState
  }
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  resetAuthState
} = authSlice.actions;
export default authSlice.reducer;
