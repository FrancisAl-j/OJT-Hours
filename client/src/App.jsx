import React, { useEffect } from "react";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { checkAuth } from "./redux/thunks/authThunks.js";

const App = () => {
  const dispatch = useDispatch();
  const { user, isCheckingAuth } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (isCheckingAuth && !user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Router>
      <div className="">
        <Nav />

        <main>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin"
              element={user ? <Navigate to="/" /> : <Signin />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
