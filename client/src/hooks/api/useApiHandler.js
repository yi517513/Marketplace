import { useCallback, useMemo } from "react";
import useApiRequest from "./useApiRequest";
import useApiCallback from "./useApiCallback";
import serviceMap from "../../services/serviceMap";
import useStrategies from "../handler/useStrategies";

const useApiHandler = () => {
  console.log(`using useApiHandler`);

  const { asyncRequest } = useApiRequest();
  // const getApiCallback = useApiCallback();
  const getApiService = serviceMap();
  // const strategies = useStrategies();

  // const createApiHandler = useCallback((action) => {
  //   console.log("createApiHandler invoked");
  //   const { optimistic, successCb, errorCb } = getApiCallback(action);
  //   const actionService = getApiService(action);

  //   if (!actionService) {
  //     console.warn(`No actionService for action: ${action}`);
  //     return;
  //   }

  //   return async (payload) => {
  //     try {
  //       try {
  //         strategies.setLoadingNotify(action);
  //         optimistic(payload);
  //       } catch (error) {
  //         // 直接由optimistic拋出錯誤
  //         const errorMessage = error.message;
  //         console.log(errorMessage);
  //         errorCb(errorMessage);
  //         return;
  //       }

  //       const { data, message } = await asyncRequest(actionService, payload);
  //       console.log(data);
  //       successCb({ data, message });
  //     } catch (error) {
  //       console.log(error);
  //       const errorMessage = error.response?.data.message;
  //       errorCb(errorMessage);
  //     }
  //   };
  // }, []);

  const test = () => {};
  // return createApiHandler;
  return test;
};

export default useApiHandler;
