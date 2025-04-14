import React, { useEffect, useState } from "react";

const Time = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(58);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const getTime = () => {
    //const time = Date.now();

    //setHours(Math.floor((1000 * 60 * 60) % 24));
    //setMinutes(Math.floor((1000 / 60) % 60));
    setSeconds((prevSec) => {
      if (prevSec === 59) {
        setMinutes((prevMins) => {
          if (prevMins === 59) {
            setHours((hours) => hours + 1);
            return 0;
          } else {
            return prevMins + 1;
          }
        });
        return 0;
      } else {
        return prevSec + 1;
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[100svh]">
      <div>
        <div></div>

        <button onClick={() => setIsActive(true)}>Start</button>
      </div>
    </section>
  );
};

export default Time;
