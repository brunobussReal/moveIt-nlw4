import React, { useContext, useEffect, useState } from "react";
import { challengesContext } from "../../contexts/ChallengeContext";

import styles from "./CountDown.module.css";

let countdownTimeout: NodeJS.Timeout;

const CountDown: React.FC = () => {
  const { startNewChallenge } = useContext(challengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

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
    setIsActive(true);
    setHasFinished(false);
  }

  function resetCountdown() {
    //clear countdown timeout to stop the counter imediatly after this function is executed
    clearTimeout(countdownTimeout);
    setIsActive(false);
  }

  useEffect(() => {
    if (isActive && time) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

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
      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Finished
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              onClick={resetCountdown}
              className={`${styles.countdownButton} ${styles.countdownButtonActive} `}
            >
              Interrupt Cycle
            </button>
          ) : (
            <button onClick={startCountdown} className={styles.countdownButton}>
              Start Cycle
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CountDown;
