import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const usePagination = (originalData) => {
  const globalItemsPerPage = useSelector((state) => state.common.itemsPerPage);
  const [itemsPerPage, setItemsPerPage] = useState(globalItemsPerPage);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const totalItems = originalData?.length;
  const totalPageCount = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const start = (currentPageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedData(originalData?.slice(start, end) || []);
  }, [currentPageNumber, originalData, itemsPerPage]);

  useEffect(() => {
    if (currentPageNumber > totalPageCount) setCurrentPageNumber(1);
  }, [itemsPerPage]);

  const paginationActions = {
    currentPageNumber,
    totalPageCount,
    setCurrentPageNumber,
    setItemsPerPage,
    itemsPerPage,
  };

  return { paginatedData, paginationActions };
};

export default usePagination;
