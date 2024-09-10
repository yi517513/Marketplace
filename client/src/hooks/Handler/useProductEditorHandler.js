import { useCallback } from "react";
import { PATHS } from "../../utils/paths";
import useNavigation from "../useNavigation";
import useAsyncAction from "../useAsyncAction";

// 新增、更新商品API應回傳productId
const useProductEditorHandler = (currentPath, actionConfig) => {
  const { asyncAction } = useAsyncAction();
  const { navigateTo } = useNavigation();

  // 新增、更新商品
  const handleSubmit = useCallback(
    (values, { setSubmitting }) => {
      const images = values.images.filter((image) => image);
      const productInfo = { ...values, images };

      asyncAction(
        actionConfig.service,
        productInfo,
        actionConfig.submissionMessages,
        (success, productId) => {
          if (success) {
            setSubmitting(false);
            navigateTo(`${PATHS.PRODUCT_DETAILS}/${productId}`);
          }
        }
      );
    },
    [currentPath, asyncAction]
  );

  return handleSubmit;
};

export default useProductEditorHandler;
