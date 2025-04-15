import { createSlice } from "@reduxjs/toolkit";
import { createHours } from "../thunks/hoursThunks.js";
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
  },
});

export default hoursSlice.reducer;
