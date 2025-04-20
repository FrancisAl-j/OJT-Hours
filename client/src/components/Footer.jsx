import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date(Date.now());
  const currYear = date.getFullYear();

  return (
    <footer className="w-full bg-[#169976] text-white leading-10 py-6 px-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">OJT HOURS</h1>

        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/profile">
            <li>Profile</li>
          </Link>
        </ul>

        <p>
          Copyright © {currYear} -{" "}
          <span className="font-bold">Francis Al-j Bilas</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
