import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/thunks/authThunks.js";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSigningUp } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const result = await dispatch(signup(formData));

    if (signup.fulfilled.match(result)) {
      navigate("/signin");
    }
  };

  return (
    <div className="h-[100svh] grid place-items-center">
      <section className="flex w-full flex-row-reverse">
        <div className="flex-1 grid place-items-center">
          <form
            onSubmit={handleSignup}
            className="form-container shadow-2xl shadow-black p-4 rounded-xl"
          >
            <h1 className="text-white text-2xl mb-6">Create an account</h1>

            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-white text-xl">Username</span>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  className="bg-white p-1 rounded-xl"
                />
              </div>

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
                {isSigningUp ? "Signing up..." : "Sign up"}
              </button>
            </div>

            <p className="text-white">
              Already have an account?{" "}
              <Link to="/signin">
                <span className="text-blue-600 cursor-pointer underline">
                  Sign in here.
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

export default Signup;
