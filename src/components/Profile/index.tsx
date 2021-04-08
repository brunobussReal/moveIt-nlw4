import React, { useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import Image from "next/image";

import { challengesContext } from "../../contexts/ChallengeContext";
import { FiLogOut } from "react-icons/fi";

import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const { level } = useContext(challengesContext);
  const [session] = useSession();
  session && console.log(session.user);

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signIn();
  };

  const handleSignOut = (e: any) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className={styles.profileContainer}>
      {session ? (
        <>
          <div className={styles.avatarWrapper}>
            <Image
              width={1000}
              height={1000}
              src={session.user.image}
              alt="Bruno Buss"
            />
          </div>
          <div>
            <strong>{session.user.name}</strong>
            <FiLogOut onClick={handleSignOut} />

            <p>
              {/* next js identifica automaticamente a pasta public */}
              <img src="icons/level.svg" alt="Level" />
              Level {level}
            </p>
          </div>
        </>
      ) : (
        <button onClick={handleSignIn} className={styles.loginButton}>
          Sign in
        </button>
      )}
    </div>
  );
};

export default Profile;
