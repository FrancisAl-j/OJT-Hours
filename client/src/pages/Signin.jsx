import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/thunks/authThunks.js";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // FOR SEO

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isSigningIn } = useSelector((state) => state.auth);
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

  // Logging in Function
  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await dispatch(signin(formData));

    if (signin.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="h-[100svh] grid place-items-center">
      <Helmet>
        <title>Signin | OJT HOURS</title>
        <meta
          name="description"
          content="Signin to explore what the page can offer."
        />
        <link rel="canonical" href="http://localhost:5173/signin" />
      </Helmet>
      <section className="flex w-full">
        <div className="flex-1 grid place-items-center">
          <form
            onSubmit={handleSignIn}
            className="form-container shadow-2xl shadow-black p-4 rounded-xl"
          >
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
                {isSigningIn ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <p className="text-white">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-blue-600 cursor-pointer underline">
                  Sign up here.
                </span>
              </Link>
            </p>
            {error && <p className="text-sm text-red-600">{error}</p>}
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
