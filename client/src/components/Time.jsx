import React, { useEffect, useState } from "react";
import { updateHours, getHours } from "../redux/thunks/hoursThunks.js";
import { useDispatch, useSelector } from "react-redux";
import {
  startTime,
  pauseTime,
  stopTime,
} from "../redux/reducers/hoursReducer.js";

const Time = () => {
  const dispatch = useDispatch();
  const { hoursData, hours, minutes, seconds, isActive, start } = useSelector(
    (state) => state.hours
  );

  const handleSubmitHours = async () => {
    const result = await dispatch(
      updateHours({ id: hoursData?._id, time: hours, minutes, seconds })
    );

    if (updateHours.fulfilled.match(result)) {
      dispatch(stopTime());
      dispatch(getHours());
      localStorage.removeItem("seconds");
      localStorage.removeItem("minutes");
      localStorage.removeItem("hours");
      localStorage.removeItem("isActive");
      localStorage.removeItem("start");
    }
  };

  return (
    <section className="h-[100svh] grid place-items-center" id="time">
      <div className="clock-container flex flex-col items-center gap-10 shadow-2xl shadow-black p-5">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-white font-bold text-4xl">{hours} hr</h1>
          <span className="text-white font-bold text-4xl">:</span>
          <h1 className="text-white font-bold text-4xl">{minutes} mins</h1>
          <span className="text-white font-bold text-4xl">:</span>
          <h1 className="text-white font-bold text-4xl">{seconds} sec</h1>
        </div>

        {!start ? (
          <button
            onClick={() => dispatch(startTime())}
            className="px-7 py-2 bg-[#169976] cursor-pointer rounded-lg w-full text-white font-semibold text-2xl"
          >
            Start
          </button>
        ) : (
          <div className="flex w-full gap-2">
            <button
              onClick={
                isActive
                  ? () => dispatch(pauseTime())
                  : () => dispatch(startTime())
              }
              className={`px-7 py-2 ${
                isActive ? "bg-red-400" : "bg-gray-700"
              }  cursor-pointer rounded-lg w-full text-white font-semibold text-2xl`}
            >
              {isActive ? "Pause" : "Resume"}
            </button>
            <button
              onClick={handleSubmitHours}
              className="px-7 py-2 bg-green-600 cursor-pointer rounded-lg w-full text-white font-semibold text-2xl"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Time;
