import React, { useState } from "react";
import History from "../components/History";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/thunks/authThunks.js";
import { Helmet } from "react-helmet";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    const result = await dispatch(
      updateProfile({ id: user?._id, username, password })
    );

    console.log(result);
  };

  return (
    <section className="h-auto py-10 xl:h-[100svh] w-full grid place-item-center">
      <Helmet>
        <title>Profile | OJT HOURS</title>
        <meta
          name="description"
          content="Explore a responsive profile page that you can update anytime without worry and view your rendered hours history."
        />
        <link rel="canonical" href="http://localhost:5173/profile" />
      </Helmet>
      <div className="flex-col-reverse xl:flex-row flex w-full gap-4">
        <History />

        <form
          onSubmit={handleUpdate}
          className=" w-full h-full grid place-items-center "
        >
          <div className="profile-container mx-auto bg-[#169976] p-3 rounded-2xl">
            <header className="mb-10">
              <h1 className="text-4xl font-bold uppercase text-center text-white">
                Profile
              </h1>
            </header>

            <main className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-col">
                <span className="text-white text-2xl">Name</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-style rounded-4xl"
                />
              </div>

              <div className="w-full flex flex-col">
                <span className="text-white text-2xl">Email</span>
                <input
                  disabled
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-style rounded-4xl hover:cursor-not-allowed"
                />
              </div>

              <div className="w-full flex flex-col">
                <span className="text-white text-2xl">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-style rounded-4xl"
                />
              </div>

              <button
                type="submit"
                className="p-2 bg-[#222] text-white text-xl rounded-3xl cursor-pointer hover:bg-green-700"
              >
                Update Profile
              </button>

              <p className="text-red-600 cursor-pointer underline text-end">
                Delete Account
              </p>
            </main>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
