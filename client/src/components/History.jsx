import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "../assets/history/calendar.svg";
import Clock from "../assets/history/clock.svg";
import { getHistory } from "../redux/thunks/hoursThunks.js";

const History = () => {
  const dispatch = useDispatch();
  const { histories, hoursData } = useSelector((state) => state.hours);
  console.log(histories);

  // Fetching the hours history of user
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <div className="w-full h-full grid place-items-center">
      <section className="profile-container bg-blue-100 rounded-xl h-122 flex flex-col overflow-hidden gap-1">
        <header className="mt-5 mb-7 px-2 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">History Hours Rendered</h1>
          <p className="bg-green-500 text-white text-center p-2 rounded-3xl">
            {hoursData?.hoursTarget} hrs
          </p>
        </header>
        <hr />
        {histories?.length === 0 ? (
          <div>
            <h1>You don't have hours rendered yet</h1>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-2 flex-1">
            {histories?.map((data, index) => {
              const date = new Date(data?.createdAt);
              const formattedDate = date.toISOString().split("T")[0]; // "2025-04-18
              // Arrays of name of days
              const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];
              // The getDay() method, returns a number for example the date May, 19, 2025 it will check 19 and it will return 1 since 19 is monday
              const dayName = days[date.getDay()];
              return (
                <div
                  key={index}
                  className="bg-white shadow-xl rounded-xl p-2 flex flex-col gap-2"
                >
                  <h1 className="text-3xl font-bold">{dayName}</h1>
                  <div className="flex gap-2 items-center">
                    <img
                      src={Calendar}
                      alt="Calendar-logo"
                      className="aspect-square w-6"
                    />
                    <p>{formattedDate}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src={Clock}
                      alt="Clock-logo"
                      className="aspect-square w-6"
                    />

                    <div className="flex gap-1">
                      <span>{data.hours}</span>
                      <span>:</span>
                      <span>{data.minutes}</span>
                      <span>:</span>
                      <span>{data.seconds}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default History;
