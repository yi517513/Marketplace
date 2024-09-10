import { useEffect } from "react";

const useCountdown = (initialTime = 0) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      setIsCounting(true);
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsCounting(false);
    }
  }, [timeLeft]);

  return { timeLeft, isCounting, setTimeLeft };
};

export default useCountdown;
