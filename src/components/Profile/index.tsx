import React from "react";

import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/brunobussReal.png" alt="Bruno Buss" />
      <div>
        <strong>Bruno Buss</strong>
        <p>
          {/* next js identifica automaticamente a pasta public */}
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
};

export default Profile;
