import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFormInit from "../hooks/Init/useFormInit";
import useSetSlug from "../hooks/Common/useSetSlug";
import useFetchData from "../hooks/fetch/useFetchData";
import { resetState } from "../redux/slices/dataSlice";

import ProductForm from "../components/Editor/ProductForm";

const EditProduct = () => {
  useSetSlug();
  const dispatch = useDispatch();
  const getFormInit = useFormInit();
  const { config, validationSchema } = getFormInit(`ProductEdit`);
  const { data } = useFetchData(`getProductById`);
  const { images, ...productInfo } = data;

  useEffect(() => {
    return () => {
      dispatch(resetState({ key: `singleProduct` }));
    };
  }, [dispatch]);

  return (
    <ProductForm
      initialValues={productInfo}
      validationSchema={validationSchema}
      {...config}
    />
  );
};

export default EditProduct;
