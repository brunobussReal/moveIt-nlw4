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
  startNewChallenge: () => void;
  activeChallenges: Challenge;
  resetChallenge: () => void;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenges, setActiveChallenges] = useState(null);

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
      }}
    >
      {children}
    </challengesContext.Provider>
  );
}
