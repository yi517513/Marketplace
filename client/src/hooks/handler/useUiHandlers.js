import { ROUTES } from "../../utils/paths";
import useStrategies from "./useStrategies";

const useUiHandlers = (path) => {
  const strategies = useStrategies();

  const uiHandlersMap = {
    [ROUTES.HOME]: {},
    [ROUTES.LOGIN]: {},
    [ROUTES.REGISTER]: {},
    [ROUTES.PROFILE]: {},
    [ROUTES.ORDERS]: {
      navigateTo: strategies.navigateTo,
    },
    [ROUTES.PRODUCTS]: {
      navigateTo: strategies.navigateTo,
    },
    [ROUTES.SHIPMENT]: {
      navigateTo: strategies.navigateTo,
    },
    [ROUTES.PURCHASED]: {
      navigateTo: strategies.navigateTo,
    },
    [ROUTES.SOLD]: {
      navigateTo: strategies.navigateTo,
    },
    [ROUTES.CREATE]: {
      handleResetState: strategies.resetState,
    },
    [ROUTES.EDIT]: {},
    VerifyCode: {
      handleCountdown: strategies.countdown,
    },
    Logout: {},
    RefreshToken: {},
    ImageManager: {
      handleImageSelect: ({ data }) => {
        console.log(data);
        const key = { parentKey: `productEdit`, childKey: `images` };
        strategies.appendState({ key, data });
        strategies.setSuccessNotify(`成功插入圖片`);
      },
    },
    CheckAuth: {},
    ImageField: {
      handleDeleteImage: ({ data }) => {
        const key = { parentKey: `productEdit`, childKey: `images` };
        strategies.removeState({ key, data });
        strategies.setSuccessNotify(`成功刪除圖片`);
      },
    },
  };

  const uiHandlers = uiHandlersMap[path] || {};

  return { uiHandlers };
};

export default useUiHandlers;
