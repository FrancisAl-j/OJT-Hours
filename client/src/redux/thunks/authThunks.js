import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../api/authApi.js";

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
