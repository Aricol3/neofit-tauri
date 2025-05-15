import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");

interface IGeneralState {
  selectedDay: string;
}

const initialState: IGeneralState = {
  selectedDay: today
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    setToday: (state) => {
      state.selectedDay = today;
    },
    resetGeneralState: () => initialState
  }
});

export const { setSelectedDay, setToday, resetGeneralState } =
  generalSlice.actions;

export default generalSlice.reducer;
