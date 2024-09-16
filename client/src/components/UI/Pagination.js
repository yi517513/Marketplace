import React from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Pagination = ({
  handlePrevious,
  handleNext,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  const handleInputChange = (e, setState) => {
    const value = e.target.value;

    const numericValue = Number(value);
    setState(value === "" ? "" : isNaN(numericValue) ? value : numericValue);
  };

  return (
    <div className="pagination-container">
      <div className="pagination-tools">
        <Button
          label="上一頁"
          disabled={isFirstPage}
          onClick={handlePrevious}
        />
        <Input
          placeholder={`${currentPage}/${totalPages}`}
          value={currentPage}
          onChange={(e) => handleInputChange(e, setCurrentPage)}
        />
        <Button label="下一頁" disabled={isLastPage} onClick={handleNext} />
      </div>
      <div className="pagination-select">
        <Input
          label="每頁數量"
          value={`${itemsPerPage}`}
          onChange={(e) => handleInputChange(e, setItemsPerPage)}
        />
      </div>
    </div>
  );
};

export default Pagination;
