const [stateHours, setStateHours] = useState(
parseInt(localStorage.getItem("hours")) || 0
);
const [stateMinutes, setStateMinutes] = useState(
parseInt(localStorage.getItem("minutes")) || 0
);
const [stateSeconds, setStateSeconds] = useState(
parseInt(localStorage.getItem("seconds")) || 0
);

const handleStartTime = () => {
dispatch(
startTime({
hours: stateHours,
minutes: stateMinutes,
seconds: stateSeconds,
})
);
};

useEffect(() => {
let interval;
// it will only run if the isActive state is true
if (isActive) {
interval = setInterval(() => {
// Setting the seconds functionality
setStateSeconds((prevSec) => {
if (prevSec === 59) {
setStateMinutes((prevMins) => {
if (prevMins === 59) {
setStateHours((prevHours) => {
const updated = prevHours + 1;
localStorage.setItem("hours", updated);
return updated;
});
localStorage.setItem("minutes", 0);
return 0;
} else {
const updatedMins = prevMins + 1;
localStorage.setItem("minutes", updatedMins);
return updatedMins;
}
});
localStorage.setItem("seconds", 0);
return 0;
} else {
const updatedSecs = prevSec + 1;
localStorage.setItem("seconds", updatedSecs);
return updatedSecs;
}
});
}, 1000);
}

    return () => clearInterval(interval);

}, [isActive]);

const handleSubmitHours = async () => {
const result = await dispatch(
updateHours({ id: hoursData?.\_id, time: hours, minutes, seconds })
);

    if (updateHours.fulfilled.match(result)) {
      dispatch(getHours());
      localStorage.removeItem("seconds");
      localStorage.removeItem("minutes");
      localStorage.removeItem("hours");
      localStorage.removeItem("isActive");
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setIsActive(false);
    }

};
