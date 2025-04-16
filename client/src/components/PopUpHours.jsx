import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createHours } from "../redux/thunks/hoursThunks.js";

const PopUpHours = ({ setShow }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    time: "",
    hoursTarget: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateHours = async (e) => {
    e.preventDefault();
    const { time, hoursTarget } = formData;
    const result = dispatch(
      createHours({ time: Number(time), hoursTarget: Number(hoursTarget) })
    );

    if (createHours.fulfilled.match(result)) {
      setFormData({
        time: "",
        hoursTarget: "",
      });
    }
  };

  return (
    <div className="transparent-bg w-full h-[100svh] fixed top-0 left-0 grid place-items-center bg-black">
      <form
        onSubmit={handleCreateHours}
        className="form-container bg-[#169976] p-3 flex flex-col rounded-xl"
      >
        <header className="mb-10">
          <h1 className="text-2xl text-white font-semibold">
            Enter your OJT hours details
          </h1>
        </header>

        <main className="w-full flex flex-col">
          <div className="flex flex-col gap-2">
            <span className="text-xl text-white">Rendered Hours</span>
            <input
              type="number"
              name="time"
              id=""
              value={formData.time}
              onChange={handleChange}
              className="border-[1px] py-2 px-5 rounded-3xl bg-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xl text-white">Target Hours</span>
            <input
              type="number"
              name="hoursTarget"
              value={formData.hoursTarget}
              onChange={handleChange}
              id=""
              className="border-[1px] py-2 px-5 rounded-3xl bg-white"
            />
          </div>
        </main>

        <footer className="flex mt-5 gap-1">
          <button
            type="button"
            onClick={() => setShow(false)}
            className="flex-1 py-3 bg-red-500 text-white cursor-pointer font-semibold rounded-3xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-[#2c2c2c] cursor-pointer text-white font-semibold rounded-3xl"
          >
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};

export default PopUpHours;
