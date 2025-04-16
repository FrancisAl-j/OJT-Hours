import { createSlice } from "@reduxjs/toolkit";
import { createHours, getHours } from "../thunks/hoursThunks.js";
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
  extraReducers: (builder) => {
    //! For Creating Hours
    builder.addCase(createHours.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createHours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hoursData = action.payload;
      state.error = null;
    });

    builder.addCase(createHours.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //! END FOR CREATE HOURS

    //! FOR GETTING THE HOURS DATA
    builder.addCase(getHours.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getHours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hoursData = action.payload;
      state.error = null;
    });

    builder.addCase(getHours.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //! END FOR GET HOURS
  },
});

export default hoursSlice.reducer;
