import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  hours: null,
  isLoading: false,
  error: null,
};

const hoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {},
});

export default hoursSlice.reducer;
