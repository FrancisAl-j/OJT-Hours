import React from "react";
import { useSelector } from "react-redux";
import Calendar from "../assets/history/calendar.svg";
import Clock from "../assets/history/clock.svg";

const History = () => {
  const { histories, hoursData } = useSelector((state) => state.hours);
  console.log(histories);

  // TODO: Removing the time on date

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
            {histories.map((data, index) => {
              const date = new Date(data?.createdAt);
              const formattedDate = date.toISOString().split("T")[0]; // "2025-04-18
              return (
                <div
                  key={index}
                  className="bg-white shadow-xl rounded-xl p-2 flex flex-col gap-2"
                >
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
