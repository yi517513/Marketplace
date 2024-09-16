import React from "react";
import usePagination from "../hooks/ui/usePagination";
import Pagination from "../components/UI/Pagination";
import PropTypes from "prop-types";

const PaginationContainer = ({
  originalData,
  setPaginatedData,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    handlePrevious,
    handleNext,
  } = usePagination(originalData, setPaginatedData, itemsPerPage);

  return (
    <Pagination
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
    />
  );
};

// React當中，PropTypes是一個用來檢查元件屬性的型別的工具，可以幫助我們在開發過程中發現潛在的錯誤
PaginationContainer.propTypes = {
  paraentData: PropTypes.array.isRequired,
  setParaentData: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

export default PaginationContainer;
