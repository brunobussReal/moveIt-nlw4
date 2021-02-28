import React, { useContext, useEffect, useState } from "react";
import { challengesContext } from "../../contexts/ChallengeContext";
import { countdownContext } from "../../contexts/CountDownContext";

import styles from "./CountDown.module.css";

const CountDown: React.FC = () => {
  const {
    hasFinished,
    minutes,
    seconds,
    startCountdown,
    resetCountdown,
    isActive,
  } = useContext(countdownContext);

  //convert minutes and seconds to string, if minutes has only 1 char add "0" at start and then split
  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, "0")
    .split("");
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

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
