import { createSlice } from "@reduxjs/toolkit";
import { signin } from "../thunks/authThunks.js";

// Initial State of auth
const initialState = {
  user: null,
  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  // For API's
  extraReducers: (builder) => {
    // Pending
    builder.addCase(signin.pending, (state) => {
      state.isSigningIn = true;
      state.error = null;
    });

    // Success
    builder.addCase(signin.fulfilled, (state, action) => {
      state.isSigningIn = false;
      state.user = action.payload;
      state.error = null;
    });

    // Error / Failure
    builder.addCase(signin.rejected, (state, action) => {
      state.isSigningIn = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
