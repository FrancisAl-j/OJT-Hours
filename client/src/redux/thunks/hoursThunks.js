import { createAsyncThunk } from "@reduxjs/toolkit";
import { hours } from "../api/hoursApi.js";

export const createHours = createAsyncThunk(
  "hours/create",
  async ({ time, hoursTarget }, { rejectWithValue }) => {
    try {
      const res = await hours.create({ time, hoursTarget });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign-in failed");
    }
  }
);
