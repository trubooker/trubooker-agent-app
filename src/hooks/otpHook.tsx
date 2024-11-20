import { useState, useEffect } from "react";

const useCountdown = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(0); // Starts at 0 (no countdown)
  const [isActive, setIsActive] = useState(false); // Track whether timer is active

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // Clear the interval when time is up or when component unmounts
    if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(initialSeconds);
    setIsActive(true);
  };

  return { timeLeft, isActive, startTimer };
};

export default useCountdown;
