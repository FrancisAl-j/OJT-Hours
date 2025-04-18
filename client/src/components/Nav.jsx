import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../assets/menu.svg";
import Home from "../assets/home.svg";
import Clock from "../assets/clock.svg";
import Profile from "../assets/profile.svg";
import Logout from "../assets/logout.svg";
import axios from "axios";
import { checkAuth, logout } from "../redux/thunks/authThunks";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      localStorage.removeItem("seconds");
      localStorage.removeItem("minutes");
      localStorage.removeItem("hours");
      localStorage.removeItem("isActive");
      localStorage.removeItem("start");
    }
  };

  return (
    <header className="bg-[#169976] w-full shadow-md shadow-black">
      <nav className="max-w-[1300px] flex items-center justify-between py-4 mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-bold">OJT HOURS</h1>
        </Link>

        {user ? (
          <div className=" relative">
            <img
              src={Menu}
              alt="hamburger-menu"
              className=" aspect-square w-10 cursor-pointer"
              onClick={() => setShow(!show)}
            />
            {show && (
              <ul className="absolute bg-[#169976] w-[230px] right-0 shadow-xl shadow-black flex flex-col">
                <Link to="/">
                  <li
                    onClick={() => setShow(false)}
                    className="flex items-center justify-between pr-4 py-3 hover:bg-[#1DCD9F]"
                  >
                    <img src={Home} alt="" className="aspect-square w-11" />
                    <p className="text-xl text-white">Home</p>
                  </li>
                </Link>

                <li
                  onClick={() => setShow(false)}
                  className="flex items-center justify-between pr-4 py-3 hover:bg-[#1DCD9F]"
                >
                  <img src={Clock} alt="" className="aspect-square w-11" />
                  <p className="text-xl text-white">Count Hours</p>
                </li>
                <Link to="/profile">
                  <li
                    onClick={() => setShow(false)}
                    className="flex items-center justify-between pr-4 py-3 hover:bg-[#1DCD9F]"
                  >
                    <img src={Profile} alt="" className="aspect-square w-11" />
                    <p className="text-xl text-white">Profile</p>
                  </li>
                </Link>

                <li
                  className="flex items-center justify-between pr-4 py-3 hover:bg-[#1DCD9F] cursor-pointer"
                  onClick={handleLogout}
                >
                  <img src={Logout} alt="" className="aspect-square w-11" />
                  <p className="text-xl text-red-700">Logout</p>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/signin">
            <button className="bg-[#222222] py-2 px-4 text-white rounded-sm cursor-pointer">
              Sign In
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Nav;
