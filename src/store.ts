import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import nutritionReducer from "./slices/nutritionSlice.ts";

const rootReducer = combineReducers({
  nutrition: nutritionReducer
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
// export type AppDispatch = typeof store.dispatch;

export default store;
