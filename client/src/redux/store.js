import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer.js";
import hoursReducer from "./reducers/hoursReducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    hours: hoursReducer,
  },
});

export default store;
