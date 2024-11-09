import { useCallback } from "react";

const useApiRequest = () => {
  const asyncRequest = useCallback(async (actionService, servicePayload) => {
    console.log(`using asyncRequest `);
    const response = await actionService(servicePayload);
    console.log(`get  response`);
    return response.data;
  }, []);

  return { asyncRequest };
};

export default useApiRequest;
