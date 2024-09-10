import { useState, useMemo } from "react";

const usePagination = (datas, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = datas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentDatas = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return datas.slice(start, end);
  }, [currentPage, itemsPerPage, datas]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < datas.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginationProps = {
    currentPage,
    totalPages,
    setCurrentPage,
    handlePrevious,
    handleNext,
  };

  return {
    currentDatas,
    paginationProps,
  };
};

export default usePagination;
