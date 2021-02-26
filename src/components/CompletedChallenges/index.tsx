import React from "react";

import styles from "./CompletedChallenges.module.css";

const CompletedChallenges: React.FC = () => {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Completed challenges</span>
      <span>5</span>
    </div>
  );
};

export default CompletedChallenges;
