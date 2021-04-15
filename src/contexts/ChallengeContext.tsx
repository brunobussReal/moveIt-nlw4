import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import LevelUpModal from "../components/LevelUpModal";

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenges: any;
}

export interface Challenge {
  id: string;
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenges: Challenge;
  isLevelUpModalOpen: boolean;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [challenges, setChallenges] = useState([]);
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenges, setActiveChallenges] = useState<Challenge>(
    rest.activeChallenges ?? null
  );
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2); //method used by some rpg games

  useEffect(() => {
    Notification.requestPermission();
    async function getData() {
      const res = await fetch("http://moveit-nlw4.vercel.app/api/challenges");
      const json = await res.json();
      setChallenges(json);
    }
    getData();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
    Cookies.set("activeChallenges", JSON.stringify(activeChallenges));
  }, [level, currentExperience, challengesCompleted, activeChallenges]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    if (challenges) {
      const randomChallenges = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[randomChallenges];

      setActiveChallenges(challenge as Challenge);

      if (Notification.permission === "granted") {
        new Audio("/notification.mp3").play();
        new Notification("New Challenge!!!", {
          body: `Complete the challenge and earn ${challenge.amount} xp`,
          silent: false,
        });
      }
    }
  }

  function resetChallenge() {
    setActiveChallenges(null);
  }

  function completeChallenge() {
    if (!activeChallenges) {
      return;
    }
    const { amount } = activeChallenges;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenges(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <challengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenges,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
        isLevelUpModalOpen,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </challengesContext.Provider>
  );
}
