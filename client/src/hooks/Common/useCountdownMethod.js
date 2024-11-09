import { useState, useEffect, useRef } from "react";

// context的邏輯處理
const useCountdownMethod = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasStartedCountdown, setHasStartedCountdown] = useState(false);
  const timerRef = useRef(null);
  const startCountdown = (seconds) => {
    if (hasStartedCountdown) return;

    setHasStartedCountdown(true);
    setTimeLeft(seconds);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setHasStartedCountdown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetCountdown = () => {
    // 在重置計時器之前清除計時器
    clearInterval(timerRef.current);
    setTimeLeft(0);
    setHasStartedCountdown(false);
  };

  // 清理計時器
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return { timeLeft, startCountdown, resetCountdown, hasStartedCountdown };
};

export default useCountdownMethod;
