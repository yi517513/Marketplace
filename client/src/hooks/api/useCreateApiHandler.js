import { useCallback } from "react";
import useApiRequest from "./useApiRequest";
import useRouterServices from "./useRouterServices";
import useRouterCallbacks from "./useRouterCallbacks";

const useCreateApiHandler = (path) => {
  console.log(`using useCreateApiHandler `);
  const { asyncRequest } = useApiRequest();
  const { routerServices } = useRouterServices(path);
  const { optimisticCallbacks, successCallbacks, errorCallbacks } =
    useRouterCallbacks(path);

  const createApiHandler = useCallback(
    (actionType) => async (payload) => {
      console.log(`createApiHandler`);
      const actionService = routerServices[actionType];
      const optimisticCallback = optimisticCallbacks[actionType];
      const successCallback = successCallbacks[actionType];
      const errorCallback = errorCallbacks[actionType];

      try {
        // 樂觀更新
        try {
          console.log(`payload: ${payload}`);
          optimisticCallback({ actionType, payload });
        } catch (error) {
          const errorMessage = error.message;
          console.log(errorMessage);
          errorCallback(errorMessage);
          // 避免後續請求
          return;
        }

        const { data, message } = await asyncRequest(actionService, payload);
        console.log(data);
        successCallback({ data, message });
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data.message;
        errorCallback(errorMessage);
      }
    },
    [asyncRequest]
  );

  return { createApiHandler };
};

export default useCreateApiHandler;
