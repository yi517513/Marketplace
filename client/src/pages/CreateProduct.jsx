import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFormInit from "../hooks/Init/useFormInit";
import { resetState } from "../redux/slices/dataSlice";

import ProductForm from "../components/Editor/ProductForm";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const getFormInit = useFormInit();
  const { initialValues, validationSchema, config } =
    getFormInit(`ProductPost`);

  useEffect(() => {
    return () => {
      dispatch(resetState({ key: `singleProduct` }));
    };
  }, [dispatch]);

  return (
    <ProductForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      {...config}
    />
  );
};

export default CreateProduct;
