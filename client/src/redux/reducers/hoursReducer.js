import { createSlice } from "@reduxjs/toolkit";
import { createHours, getHours, updateHours } from "../thunks/hoursThunks.js";
const initialState = {
  hours: parseInt(localStorage.getItem("hours")) || 0,
  minutes: parseInt(localStorage.getItem("minutes")) || 0,
  seconds: parseInt(localStorage.getItem("seconds")) || 0,
  isActive: localStorage.getItem("isActive") || false,
  start: localStorage.getItem("start") || false,
  isLoading: false,
  error: null,
  hoursData: null,
};

const hoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {
    startTime: (state, action) => {
      state.isActive = true;
      state.start = true;
      state.seconds += 1;
      localStorage("seconds", (state.seconds += 1));
      if (state.seconds === 59) {
        localStorage("minutes", (state.minutes += 1));
        state.seconds = 0;
        state.minutes += 1;
      }
      if (state.minutes === 59) {
        localStorage("hours", (state.hours += 1));
        state.minutes = 0;
        state.hours += 1;
      }
    },

    stopTime: (state) => {
      state.seconds = 0;
      state.minutes = 0;
      state.hours = 0;
      state.isActive = false;
      state.start = false;
    },

    pauseTime: (state) => {
      state.isActive = false;
    },
  },
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

    //! FOR UPDATING THE HOURS
    builder.addCase(updateHours.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateHours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateHours.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //! END FOR UPDATING HOURS
  },
});

export const { startTime, stopTime } = hoursSlice.actions;
export default hoursSlice.reducer;
