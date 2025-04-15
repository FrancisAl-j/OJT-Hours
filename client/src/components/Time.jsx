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
  const [isActive, setIsActive] = useState(false);

  const getTime = () => {
    //const time = Date.now();
    //setHours(Math.floor((1000 * 60 * 60) % 24));
    //setMinutes(Math.floor((1000 / 60) % 60));
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 59) {
            setMinutes((prevMins) => {
              if (prevMins === 59) {
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

        <button
          onClick={() => setIsActive(!isActive)}
          className="px-7 py-2 bg-[#169976] cursor-pointer rounded-lg w-full text-white font-semibold text-2xl"
        >
          {isActive ? "Pause" : "Start"}
        </button>
      </div>
    </section>
  );
};

export default Time;
