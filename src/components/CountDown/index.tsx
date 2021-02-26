import React from "react";

import styles from "./CountDown.module.css";

const CountDown: React.FC = () => {
  return (
    <div className={styles.countDownContainer}>
      <div>
        <span>2</span>
        <span>5</span>
      </div>
      <span>:</span>
      <div>
        <span>0</span>
        <span>0</span>
      </div>
    </div>
  );
};

export default CountDown;
