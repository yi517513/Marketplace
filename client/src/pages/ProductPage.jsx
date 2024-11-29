import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSetSlug from "../hooks/Common/useSetSlug";
import useFetchData from "../hooks/fetch/useFetchData";
import { resetState } from "../redux/slices/dataSlice";

import ProductDetail from "../components/ProductDetail/ProductDetail";

const ProductPage = () => {
  // 設定slug，api請求時參數會用到
  useSetSlug();
  const dispatch = useDispatch();
  const { loading, data } = useFetchData(`getProduct`);
  const owner = data?.owner;

  useEffect(() => {
    return () => {
      dispatch(resetState({ key: `singleProduct` }));
    };
  }, [dispatch]);

  return <ProductDetail productInfo={data} owner={owner} />;
};

export default ProductPage;
