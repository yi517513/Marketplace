import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAsyncAction from "../api/useAsyncAction";

import useValidationSchema from "../map/useValidationSchema";
import useInitialValues from "../map/useInitialValues";
import useProfileHandler from "../Handler/useProfileHandler";
import useFetchDataMap from "../map/useFetchData";

const useProfileConfig = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;

  const { asyncAction } = useAsyncAction();
  const fetchData = useFetchDataMap(currentPath);
  const handleSubmit = useProfileHandler(currentPath, setUserData, fetchData);
  const initialValues = useInitialValues(currentPath);
  const validationSchema = useValidationSchema(currentPath);

  const selectOptionsConfig = { 1: `選擇性別`, 2: `男`, 3: `女`, 4: `其他` };

  useEffect(() => {
    setUserData(initialValues);
  }, [initialValues]);

  useEffect(() => {
    fetchData(setUserData);
  }, [currentPath, asyncAction]);

  return { selectOptionsConfig, userData, validationSchema, handleSubmit };
};

export default useProfileConfig;
