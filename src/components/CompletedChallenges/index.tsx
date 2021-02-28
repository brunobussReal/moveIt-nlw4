import React, { useContext } from "react";
import { challengesContext } from "../../contexts/ChallengeContext";

import styles from "./CompletedChallenges.module.css";

const CompletedChallenges: React.FC = () => {
  const { challengesCompleted } = useContext(challengesContext);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Completed challenges</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};

export default CompletedChallenges;
