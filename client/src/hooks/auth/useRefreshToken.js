import { useApiRequest } from "../../context/ApiRequestContext";
import { useEffect } from "react";

const INTERVAL_DELAY = 30000;

const useRefreshToken = (isAuthenticated) => {
  const createApiHandler = useApiRequest();
  const handleRefreshToken = createApiHandler(`refreshToken`);

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
