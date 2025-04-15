import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  isLoading: false,
  error: null,
  hoursData: null,
};

const hoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {},
});

export default hoursSlice.reducer;
