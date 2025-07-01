import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice.ts";
import userProfileReducer from "./slices/userProfileSlice.ts";
import generalReducer from "./slices/generalSlice.ts";
import nutritionReducer from "./slices/nutritionSlice.ts";
import activityReducer from "./slices/activitySlice.ts";

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  general: generalReducer,
  nutrition: nutritionReducer,
  activity: activityReducer,
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
  // middleware: [thunkMiddleware]
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// export type AppDispatch = typeof store.dispatch;

export default store;
