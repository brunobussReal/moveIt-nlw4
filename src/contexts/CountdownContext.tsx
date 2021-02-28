import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { challengesContext } from "./ChallengeContext";

interface CountdownContextData {
  time: number;
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const countdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(challengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
    setHasFinished(false);
  }

  function resetCountdown() {
    //clear countdown timeout to stop the counter imediatly after this function is executed
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <countdownContext.Provider
      value={{
        time,
        isActive,
        hasFinished,
        minutes,
        seconds,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </countdownContext.Provider>
  );
}
