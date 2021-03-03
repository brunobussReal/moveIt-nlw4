import { useContext } from "react";
import { challengesContext } from "../../contexts/ChallengeContext";
import styles from "./LevelUpModal.module.css";

export default function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(challengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <header>{level}</header>

        <strong>Congratulations</strong>
        <p>You have reached a new level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" />
        </button>
      </div>
    </div>
  );
}
