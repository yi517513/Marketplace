import React, { useEffect } from "react";
import usePagination from "../hooks/Common/usePagination";
import { useDispatch } from "react-redux";
import { setPagination } from "../redux/slices/commonSlice";

const withPagination = (WrappedComponent) => {
  return ({ originalData, ...otherProps }) => {
    const dispatch = useDispatch();
    const { paginatedData, paginationActions } = usePagination(originalData);
    const { itemsPerPage, setItemsPerPage } = paginationActions;

    useEffect(() => {
      return () => {
        dispatch(setPagination(itemsPerPage));
      };
    }, [itemsPerPage]);

    return (
      <WrappedComponent
        paginatedData={paginatedData}
        {...otherProps}
        paginationActions={{ ...paginationActions, setItemsPerPage }}
      />
    );
  };
};

export default withPagination;
