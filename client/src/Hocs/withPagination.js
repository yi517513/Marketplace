import React from "react";
import usePagination from "../hooks/Common/usePagination";
import Pagination from "../components/UI/Pagination";
import { useDispatch } from "react-redux";
import { setPagination } from "../redux/slices/commonSlice";

const withPagination = (WrappedComponent) => {
  return ({ originalData, ...otherProps }) => {
    const dispatch = useDispatch();

    const { itemsPerPageCount, paginatedData, paginationHandlers } =
      usePagination(originalData);

    return (
      <section className="flex flex-col justify-between w-full h-full">
        <div className="h-[90%]">
          <WrappedComponent
            paginatedData={paginatedData}
            itemsPerPageCount={itemsPerPageCount}
            {...otherProps}
          />
        </div>

        <div className="h-[10%]">
          <Pagination
            {...paginationHandlers}
            itemsPerPageCount={itemsPerPageCount}
            setItemsPerPageCount={(count) => dispatch(setPagination(count))}
          />
        </div>
      </section>
    );
  };
};

export default withPagination;
