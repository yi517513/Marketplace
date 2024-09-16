import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NOTIFICATION_TYPES } from "../../utils/constants";
import NotificationService from "../../services/notificationService";
import { setApiLoading } from "../../redux/slices/loadingSlice";
const { SUCCESS, ERROR } = NOTIFICATION_TYPES;

const useAsyncAction = () => {
  const dispatch = useDispatch();

  const asyncAction = useCallback(
    async (
      actionFunction,
      actionPayload,
      notifyMessage = null,
      successCallback
    ) => {
      if (notifyMessage) {
        NotificationService.setToast(dispatch, notifyMessage);
      }
      dispatch(setApiLoading(true));
      try {
        const response = await actionFunction(actionPayload);
        const message = response.data.message;
        if (message) {
          NotificationService.setToast(dispatch, message, SUCCESS);
        }
        console.log("response.data.data", response.data.data);
        if (successCallback) successCallback(true, response.data.data);
      } catch (error) {
        console.log(error);
        const message = error.response?.data;
        NotificationService.setToast(dispatch, message, ERROR);
      } finally {
        dispatch(setApiLoading(false));
      }
    },
    [dispatch]
  );
  return { asyncAction };
};

export default useAsyncAction;
