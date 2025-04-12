import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header className="bg-[#169976] w-full shadow-md shadow-black">
      <nav className="max-w-[1300px] flex items-center justify-between py-4 mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-bold">OJT HOURS</h1>
        </Link>

        <Link to="/signin">
          <button className="bg-[#222222] py-2 px-4 text-white rounded-sm cursor-pointer">
            Sign In
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Nav;
