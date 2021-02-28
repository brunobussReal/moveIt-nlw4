import React, { useEffect, useState } from "react";

import styles from "./CountDown.module.css";

const CountDown: React.FC = () => {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  //convert minutes and seconds to string, if minutes has only 1 char add "0" at start and then split
  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, "0")
    .split("");
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

  function startCountdown() {
    setActive(true);
  }

  useEffect(() => {
    if (active && time) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>
      <button onClick={startCountdown} className={styles.countdownButton}>
        Start Cycle
      </button>
    </div>
  );
};

export default CountDown;
