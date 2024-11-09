import { useEffect } from "react";
import useFormikInit from "../formik/useFormikInit";
import { useSelector } from "react-redux";

import useApiHandlers from "../handler/useApiHandlers";
import useUiHandlers from "../handler/useUiHandlers";
import useFetchHandler from "../handler/useFetchHandler";
import useStoreData from "./useStoreData";
import { PATH_TO_KEY } from "../../utils/paths";
// import { usePathContext } from "../../context/PathContext";

const useConfig = () => {
  console.log(`using useConfig`);
  const userId = useSelector((state) => state.auth.userId);
  const isAppOnReady = useSelector((state) => state.common.isAppOnReady);

  // const { staticPath, slug } = usePathContext();

  const staticPath = () => {};
  const slug = () => {};

  console.log(`staticPath: ${staticPath}`);

  const { apiHandlers } = useApiHandlers(staticPath);
  const { uiHandlers } = useUiHandlers(staticPath);
  const { formikInit } = useFormikInit(staticPath);
  const { fetchHandler } = useFetchHandler(staticPath);
  // const { loading, selectedData } = useStoreData(PATH_TO_KEY[staticPath]);

  const { handleResetState } = uiHandlers;

  console.log(`fetchHandler: ${fetchHandler}`);

  useEffect(() => {
    console.log(`using useConfig useEffect`);
    handleResetState && handleResetState({ key: PATH_TO_KEY[staticPath] });

    if (!fetchHandler) return;

    const payload = slug ? slug : userId;

    fetchHandler(payload);
  }, [staticPath, isAppOnReady]);

  return {
    staticPath,
    // loading,
    // selectedData,
    apiHandlers,
    uiHandlers,
    formikInit,
  };
};

export default useConfig;
