import { useState, useEffect } from "react";

const usePagination = (originalData, setPaginatedData, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = originalData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < originalData?.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    if (currentPage === 0) {
      return;
    }

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    setPaginatedData(originalData?.slice(start, end));
  }, [currentPage, originalData, itemsPerPage, setPaginatedData]);

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    handlePrevious,
    handleNext,
  };
};

export default usePagination;
