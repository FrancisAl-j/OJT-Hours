import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../api/authApi.js";

// Checking Authentication of user to stay logged in
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

// Login / Signin
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

// Register / Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await auth.signup(formData);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign-in failed");
    }
  }
);
