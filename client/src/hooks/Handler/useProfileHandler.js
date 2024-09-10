import { useCallback } from "react";
import useRouteServices from "../service/useRouteServices";
import useAsyncAction from "../Common/useAsyncAction";
import { PATHS } from "../../utils/paths";

const useProfileHandler = (currentPath, setUserData, fetchData) => {
  const services = useRouteServices(currentPath);
  const { asyncAction } = useAsyncAction();

  // ProfileForm.js
  const handleUpdateProfile = useCallback(
    (values, { setSubmitting }) => {
      asyncAction(services.update, values, "正在更新個人資料", (success) => {
        if (success) {
          setSubmitting(false);
          fetchData(setUserData);
        }
      });
    },
    [asyncAction, services, fetchData, setUserData]
  );

  const handlersMap = {
    [PATHS.PROFILE]: {
      handleSubmit: handleUpdateProfile,
    },
  };

  const handleSubmit = handlersMap[currentPath] || {};

  return handleSubmit;
};

export default useProfileHandler;
