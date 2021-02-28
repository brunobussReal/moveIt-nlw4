import React from "react";

import styles from "./ChallengeBox.module.css";

const ChallengeBox: React.FC = () => {
  const hasActiveChallenges = true;

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenges ? (
        <div className={styles.challengeActive}>
          <header>Earn 400 xp</header>
          <main>
            <img src="icons/body.svg" alt="" />
            <strong>New Challenge</strong>
            <p>Get up and walk for 3 minutes!</p>
          </main>
          <footer>
            <button type="button" className={styles.challengeFailedButton}>
              Failed
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
              Succeeded
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finish a cycle to receive challenges</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up" />
            Level up completing challenges
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
