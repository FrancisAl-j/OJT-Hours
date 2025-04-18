import React, { useEffect } from "react";
import { runningTime } from "../redux/reducers/hoursReducer";
import { useSelector, useDispatch } from "react-redux";

const TimerEngine = () => {
  const dispatch = useDispatch();
  const { isActive } = useSelector((state) => state.hours);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        dispatch(runningTime());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [dispatch, isActive]);
  return null;
};

export default TimerEngine;
