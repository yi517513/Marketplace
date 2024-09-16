import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import NotificationService from "../../services/notificationService";
import { PATHS } from "../../utils/paths";

const useNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectProductDetail = (productId) => {
    return `${PATHS.PRODUCT_DETAILS}/${productId}`;
  };

  const getRedirectPath = (redirectType, productId) => {
    const redirectPathMap = {
      [`HOME`]: PATHS.HOME,
      [`REGISTER`]: PATHS.REGISTER,
      [`LOGIN`]: PATHS.LOGIN,
      [`CREATE`]: PATHS.CREATE,
      [`EDIT`]: productId ? `${PATHS.EDIT}/${productId}` : PATHS.HOME,
      [`DETAIL`]: productId ? redirectProductDetail(productId) : PATHS.HOME,
      [`PAYMENT`]: PATHS.PAYMENT,
    };
    return redirectPathMap[redirectType] || PATHS.HOME;
  };

  const navigateTo = useCallback(
    (redirectType, productId, messagePayload) => {
      const redirectPath = getRedirectPath(redirectType, productId);
      if (messagePayload) {
        const { message, type } = messagePayload;
        NotificationService.setToast(dispatch, message, type);
      }
      navigate(redirectPath);
    },
    [navigate, dispatch]
  );

  return navigateTo;
};

export default useNavigation;
