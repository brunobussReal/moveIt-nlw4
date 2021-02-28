import React, { useContext } from "react";
import { challengesContext } from "../../contexts/ChallengeContext";
import styles from "./ChallengeBox.module.css";

const ChallengeBox: React.FC = () => {
  const { activeChallenges, resetChallenge } = useContext(challengesContext);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenges ? (
        <div className={styles.challengeActive}>
          <header>Earn {activeChallenges.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenges.type}.svg`} alt="" />
            <strong>New Challenge</strong>
            <p>{activeChallenges.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={resetChallenge}
            >
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
