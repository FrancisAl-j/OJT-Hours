import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="h-[100svh] grid place-items-center">
      <section className="flex w-full">
        <div className="flex-1 grid place-items-center">
          <form className="form-container shadow-2xl shadow-black p-4 rounded-xl">
            <h1 className="text-white text-2xl mb-6">Log in your account</h1>

            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-white text-xl">Email</span>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="bg-white p-1 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-white text-xl">Password</span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="bg-white rounded-xl p-1"
                />
              </div>

              <button className="p-1 rounded-2xl bg-[#169976] cursor-pointer text-white my-4">
                Sign in
              </button>
            </div>

            <p className="text-white">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-blue-600 cursor-pointer">
                  Sign up here.
                </span>
              </Link>
            </p>
          </form>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Signin;
