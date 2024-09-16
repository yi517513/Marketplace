import { useDispatch } from "react-redux";
import useAsyncAction from "../api/useAsyncAction";
import useServices from "../map/useServices";
import useNavigation from "../navigation/useNavigation";
import { useCallback } from "react";
import { login } from "../../redux/slices/authSlice";
import { PATHS } from "../../utils/paths";

const useAuthHandler = (currentPath, modalType) => {
  const dispatch = useDispatch();
  const { asyncAction } = useAsyncAction();
  const { services } = useServices(currentPath);
  const navigateTo = useNavigation();

  const actionConfigMap = {
    [PATHS.LOGIN]: {
      submissionMessages: "正在登入",
      redirectPath: `HOME`,
    },
    [PATHS.REGISTER]: {
      submissionMessages: "註冊中...",
      redirectPath: `LOGIN`,
    },
  };

  const actionConfig = actionConfigMap[currentPath];

  const successCallback = (setSubmitting, success, userId) => {
    if (success) {
      setSubmitting(false);
      // 不是 modal 的話就跳轉頁面
      !modalType && navigateTo(actionConfig.redirectPath);
      currentPath === "/login" && dispatch(login(userId));
    }
  };

  // 登入、註冊
  const handleSubmit = useCallback(
    (values, { setSubmitting }) => {
      asyncAction(
        services.auth,
        values,
        actionConfig.submissionMessages,
        (success, data) => {
          successCallback(setSubmitting, success, data);
        }
      );
    },
    [currentPath, asyncAction]
  );

  return handleSubmit;
};

export default useAuthHandler;
