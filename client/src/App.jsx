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
import { getHours, getHistory } from "./redux/thunks/hoursThunks.js";
import Time from "./components/Time.jsx";
import Profile from "./pages/Profile.jsx";
import TimerEngine from "./components/TimerEngine.jsx";
import Footer from "./components/Footer.jsx";

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
    return <Loading />;
  }

  return (
    <Router>
      <div className="relative">
        <Nav />

        {/* Invisible component for running the timer globally */}
        <TimerEngine />

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
        <Footer />
      </div>
    </Router>
  );
};

export default App;
