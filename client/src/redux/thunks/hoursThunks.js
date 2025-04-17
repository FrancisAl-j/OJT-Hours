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

export const getHours = createAsyncThunk(
  "hours/get",
  async (_, { rejectWithValue }) => {
    try {
      const data = await hours.get();

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign-in failed");
    }
  }
);

export const updateHours = createAsyncThunk(
  "hours/update",
  async ({ id, time, minutes, seconds }, { rejectWithValue }) => {
    try {
      const data = await hours.update({ id, time, minutes, seconds });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign-in failed");
    }
  }
);
