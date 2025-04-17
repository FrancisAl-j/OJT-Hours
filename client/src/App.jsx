import React, { useEffect, useState } from "react";
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
import { getHours } from "./redux/thunks/hoursThunks.js";
import Time from "./components/Time.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  const dispatch = useDispatch();

  const { user, isCheckingAuth } = useSelector((state) => state.auth);
  const [redirectToTimer, setRedirectToTimer] = useState(false);

  useEffect(() => {
    const check = async () => {
      const result = await dispatch(checkAuth());
      dispatch(getHours());

      if (!checkAuth.fulfilled.match(result)) {
        setRedirectToTimer(true);
      }
    };

    check();
  }, [dispatch]);

  if (isCheckingAuth && !user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Router>
      <div className="relative">
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

            <Route path="/error/timer" element={<Time />} />

            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
