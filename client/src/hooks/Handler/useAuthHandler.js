import useAsyncAction from "../Common/useAsyncAction";
import useRouteServices from "../service/useRouteServices";
import useNavigation from "../useNavigation";
import { useCallback } from "react";

const useAuthHandler = (currentPath, actionConfig) => {
  const { asyncAction } = useAsyncAction();
  const { services } = useRouteServices(currentPath);
  const navigateTo = useNavigation();

  // 登入、註冊
  const handleSubmit = useCallback(
    (values, { setSubmitting }) => {
      asyncAction(
        services.auth,
        values,
        actionConfig.submissionMessages,
        (success) => {
          if (success) {
            setSubmitting(false);
            navigateTo(actionConfig.redirectPath);
          }
        }
      );
    },
    [currentPath, asyncAction]
  );

  return handleSubmit;
};

export default useAuthHandler;
