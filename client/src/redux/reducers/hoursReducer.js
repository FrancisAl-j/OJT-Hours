import { createSlice } from "@reduxjs/toolkit";
import {
  createHours,
  getHistory,
  getHours,
  updateHours,
} from "../thunks/hoursThunks.js";
const initialState = {
  hours: parseInt(localStorage.getItem("hours")) || 0,
  minutes: parseInt(localStorage.getItem("minutes")) || 0,
  seconds: parseInt(localStorage.getItem("seconds")) || 0,
  isActive: localStorage.getItem("isActive") === "true" || false,
  start: localStorage.getItem("start") === "true" || false,
  isLoading: false,
  error: null,
  hoursData: null,
  histories: [],
  historyLoading: false,
};

const hoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {
    startTime: (state) => {
      state.isActive = true;
      state.start = true;
      localStorage.setItem("isActive", true);
      localStorage.setItem("start", true);
    },
    runningTime: (state, action) => {
      state.seconds += 1;
      const seconds = state.seconds;
      localStorage.setItem("seconds", seconds);

      if (state.seconds === 59) {
        state.minutes += 1;
        const minutes = state.minutes;
        localStorage.setItem("minutes", minutes);
        state.seconds = 0;
      }
      if (state.minutes === 59) {
        state.hours += 1;
        const hours = state.hours;
        localStorage.setItem("hours", hours);
        state.minutes = 0;
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
      localStorage.setItem("isActive", false);
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

    //! Getting Hours History
    builder.addCase(getHistory.pending, (state) => {
      state.historyLoading = true;
      state.error = null;
    });

    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.historyLoading = false;
      state.histories = action.payload;
      state.error = null;
    });

    builder.addCase(getHistory.rejected, (state, action) => {});
  },
});

export const { startTime, stopTime, runningTime, pauseTime } =
  hoursSlice.actions;
export default hoursSlice.reducer;
