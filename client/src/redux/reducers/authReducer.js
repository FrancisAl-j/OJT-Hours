import { createSlice } from "@reduxjs/toolkit";
import { signin, checkAuth, signup } from "../thunks/authThunks.js";

// Initial State of auth
const initialState = {
  user: null,
  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: true,
  error: null,
  checkingAuthError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  // For API's
  extraReducers: (builder) => {
    //! FOR SIGNIN
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
    //! End of Signin

    //! FOR CHECKING AUTHENTICATON
    builder.addCase(checkAuth.pending, (state) => {
      state.isCheckingAuth = true;
      state.checkingAuthError = null;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isCheckingAuth = false;
      state.user = action.payload;
      state.checkingAuthError = null;
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isCheckingAuth = false;
      state.checkingAuthError = action.payload;
    }); //! End of checking authentication

    //! FOR SIGN UP / REGISTER
    builder.addCase(signup.pending, (state) => {
      state.isSigningUp = true;
      state.error = null;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.isSigningUp = false;
      state.error = null;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.isSigningUp = false;
      state.error = action.payload;
    });
  }, //! <- End of Builder
});

export default authSlice.reducer;
