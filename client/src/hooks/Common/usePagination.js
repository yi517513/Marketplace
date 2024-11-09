import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const usePagination = (originalData) => {
  const itemsPerPageCount = useSelector(
    (state) => state.common.itemsPerPageCount
  );
  const [currentPageNumber, changePageNumber] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const totalItems = originalData?.length;
  const totalPageCount = Math.ceil(totalItems / itemsPerPageCount);

  const goToPreviousPage = () => {
    if (currentPageNumber > 1) {
      changePageNumber(currentPageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPageNumber < originalData?.length) {
      changePageNumber(currentPageNumber + 1);
    }
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * itemsPerPageCount;
    const end = start + itemsPerPageCount;
    setPaginatedData(originalData?.slice(start, end) || []);
  }, [currentPageNumber, originalData, itemsPerPageCount]);

  const paginationHandlers = {
    currentPageNumber,
    totalPageCount,
    goToPreviousPage,
    goToNextPage,
    changePageNumber,
  };

  return { itemsPerPageCount, paginatedData, paginationHandlers };
};

export default usePagination;
