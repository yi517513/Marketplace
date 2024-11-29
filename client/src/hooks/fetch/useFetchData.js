import { useEffect } from "react";
import { useFetchApi } from "../../context/FetchApiContext";
import useReduxData from "./useReduxData";

const useFetchData = (action) => {
  const setFetchAction = useFetchApi();
  const { loading, data } = useReduxData(action);

  console.log(action);
  useEffect(() => {
    setFetchAction(action);
  }, [action]);

  return { loading, data };
};

export default useFetchData;
