import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../api/authApi.js";

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await auth.checkAuth();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign-in failed");
    }
  }
);

export const signin = createAsyncThunk(
  "auth/sigin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await auth.login(formData);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign-in failed");
    }
  }
);
