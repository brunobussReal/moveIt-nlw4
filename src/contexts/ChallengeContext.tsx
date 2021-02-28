import { createContext, ReactNode, useState } from "react";

import challenges from "../../src/challenges.json";

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  startNewChallenge: () => void;
  activeChallenges: Challenge;
  resetChallenge: () => void;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(2);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenges, setActiveChallenges] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2); //method used by some rpg games

  function startNewChallenge() {
    const randomChallenges = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallenges];

    setActiveChallenges(challenge);
  }

  function resetChallenge() {
    setActiveChallenges(null);
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
      }}
    >
      {children}
    </challengesContext.Provider>
  );
}
