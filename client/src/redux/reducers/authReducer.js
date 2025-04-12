import { createSlice } from "@reduxjs/toolkit";

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
});

export default authSlice.reducer;
