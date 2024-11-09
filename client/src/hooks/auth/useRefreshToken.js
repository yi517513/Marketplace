import useApiHandlers from "../handler/useApiHandlers";
import { useEffect } from "react";

const INTERVAL_DELAY = 30000;

const useRefreshToken = (isAuthenticated) => {
  console.log(`using useRefreshToken`);
  const { apiHandlers } = useApiHandlers(`RefreshToken`);
  const { handleRefreshToken } = apiHandlers;

  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshAccessToken = () => {
      handleRefreshToken();
    };

    const intervalId = setInterval(refreshAccessToken, INTERVAL_DELAY);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, handleRefreshToken]);
};

export default useRefreshToken;
