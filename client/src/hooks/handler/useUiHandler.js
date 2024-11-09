import useStrategies from "./useStrategies";

const useUiHandler = (action) => {
  const strategies = useStrategies();

  const uiHandlerMap = {
    navigateTo: strategies.navigateTo,
    handleResetState: strategies.resetState,
    handleCountdown: strategies.countdown,
    handleImageSelect: (data) => {
      const key = { parentKey: `productEdit`, childKey: `images` };
      strategies.appendState({ key, data });
      strategies.setSuccessNotify(`成功插入圖片`);
    },
    handleDeleteImage: (data) => {
      const key = { parentKey: `productEdit`, childKey: `images` };
      strategies.removeState({ key, data });
      strategies.setSuccessNotify(`成功刪除圖片`);
    },
  };

  return uiHandlerMap[action] || {};
};

export default useUiHandler;
