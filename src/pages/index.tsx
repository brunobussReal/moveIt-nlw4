import Head from "next/head";

import ChallengeBox from "../components/ChallengeBox";
import CompletedChallenges from "../components/CompletedChallenges";
import CountDown from "../components/CountDown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | MoveIt</title>
      </Head>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  );
}
