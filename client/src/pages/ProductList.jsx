import React, { useCallback } from "react";
import useFetchData from "../hooks/fetch/useFetchData";
import withPagination from "../Hocs/withPagination";
import withLoading from "../Hocs/withLoading";
import useBreakpoint from "../hooks/RWD/useBreakpoint";

import ProductItem from "../components/UserCenter/ProductItem";

const ProductList = () => {
  const { breakpoint } = useBreakpoint();
  const { loading, data } = useFetchData(`getUserProducts`);
  const PaginatedProductItem = withPagination(ProductItem);
  const LoadedProductItem = withLoading(PaginatedProductItem);
  const mem = useCallback(() => breakpoint, []);

  return (
    <LoadedProductItem originalData={data} loading={loading} breakpoint={mem} />
  );
};

export default ProductList;
