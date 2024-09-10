import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFormMap from "./useFormMap";
import useFormService from "./useFormService";
import useFormHandler from "./useFormHandler";
import useCRUD from "../useCRUD";
import { useParams } from "react-router-dom";
import { setDataReady } from "../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

const useFormEntry = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [initialValues, setInitialValues] = useState([]);
  const location = useLocation();
  const path = location.pathname;

  const { getData } = useCRUD();
  const component = useFormMap(path, productId);
  const services = useFormService(path, productId);
  const handlers = useFormHandler(path, productId, services);

  const { Component, defaultInitialValues, validationSchema } = component;

  useEffect(() => {
    dispatch(setDataReady(false));
    if (services.fetch) {
      getData(services.fetch, productId, (success, data) => {
        if (success) {
          setInitialValues(data);
        }
      });
    } else {
      setInitialValues(defaultInitialValues);
    }
    dispatch(setDataReady(true));
  }, [path, productId]);

  return { Component, handlers, initialValues, validationSchema };
};

export default useFormEntry;
