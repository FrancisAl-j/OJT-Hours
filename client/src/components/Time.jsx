import React, { useEffect, useState } from "react";

const Time = () => {
  const [hours, setHours] = useState(
    parseInt(localStorage.getItem("hours")) || 0
  );
  const [minutes, setMinutes] = useState(
    parseInt(localStorage.getItem("minutes")) || 0
  );
  const [seconds, setSeconds] = useState(
    parseInt(localStorage.getItem("seconds")) || 0
  );
  const [isActive, setIsActive] = useState(
    localStorage.getItem("isActive") || false
  );

  const startTime = () => {
    setIsActive(!isActive);

    if (isActive) {
      localStorage.setItem("isActive", false);
    } else {
      localStorage.setItem("isActive", true);
    }
  };

  useEffect(() => {
    let interval;
    // it will only run if the isActive state is true
    if (isActive) {
      interval = setInterval(() => {
        // Setting the seconds functionality
        setSeconds((prevSec) => {
          // In order to refresh the number to 0 we need to get the previous value of seconds then checks if it is equal to 59
          if (prevSec === 59) {
            // If the seconds is equal to 59 then it will increment the minutes by 1
            setMinutes((prevMins) => {
              // This checks if the previous minutes is equal to 59 if so, the minutes will refresh to 0
              if (prevMins === 59) {
                // then adds to hours state by 1
                setHours((hours) => {
                  hours + 1;
                  localStorage.setItem("hours", hours + 1);
                });
                localStorage.setItem("minutes", 0);
                return 0;
              } else {
                localStorage.setItem("minutes", prevMins + 1);
                return prevMins + 1;
              }
            });
            localStorage.setItem("seconds", 0);
            return 0;
          } else {
            localStorage.setItem("seconds", prevSec + 1);
            return prevSec + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section className="h-[100svh] grid place-items-center">
      <div className="clock-container flex flex-col items-center gap-10 shadow-2xl shadow-black p-5">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-white font-bold text-4xl">{hours} hr</h1>
          <span className="text-white font-bold text-4xl">:</span>
          <h1 className="text-white font-bold text-4xl">{minutes} mins</h1>
          <span className="text-white font-bold text-4xl">:</span>
          <h1 className="text-white font-bold text-4xl">{seconds} sec</h1>
        </div>

        {seconds === 0 ? (
          <button
            onClick={startTime}
            className="px-7 py-2 bg-[#169976] cursor-pointer rounded-lg w-full text-white font-semibold text-2xl"
          >
            Start
          </button>
        ) : (
          <div className="flex w-full gap-2">
            <button
              onClick={startTime}
              className={`px-7 py-2 ${
                isActive ? "bg-red-400" : "bg-gray-700"
              }  cursor-pointer rounded-lg w-full text-white font-semibold text-2xl`}
            >
              {isActive ? "Pause" : "Resume"}
            </button>
            <button className="px-7 py-2 bg-green-600 cursor-pointer rounded-lg w-full text-white font-semibold text-2xl">
              Submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Time;
