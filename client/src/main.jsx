import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  /**
   * Assets Hex
   * #222222 <- background color
   * #000000 <- Text color
   * #1DCD9F <- Secondary
   * #169976 <- Primary
   * #ffffff <- White interchangable with black
   */
  <Provider store={store}>
    <App />
  </Provider>
);
