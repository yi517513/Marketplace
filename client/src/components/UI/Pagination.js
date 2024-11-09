import React from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Pagination = ({
  currentPageNumber,
  totalPageCount,
  goToPreviousPage,
  goToNextPage,
  changePageNumber,
  itemsPerPageCount,
  setItemsPerPageCount,
}) => {
  const isFirstPage = currentPageNumber === 1;
  const isLastPage = currentPageNumber >= totalPageCount;

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    const numericValue = Number(value);
    setState(value === "" ? "" : isNaN(numericValue) ? value : numericValue);
  };

  return (
    <div className="flex w-full items-center justify-between shadow-outline">
      <div className="flex items-center w-1/5">
        <Input
          label="每頁數量"
          placeholder={`${itemsPerPageCount}`}
          onChange={(e) => handleInputChange(e, setItemsPerPageCount)}
          className="max-w-20"
        />
      </div>
      <div className="flex items-center">
        <Button
          label="上一頁"
          disabled={isFirstPage}
          onClick={goToPreviousPage}
          className="mx-1 py-1"
        />
        <Input
          type="number"
          placeholder={`${currentPageNumber}/${totalPageCount}`}
          value={currentPageNumber}
          onChange={(e) => handleInputChange(e, changePageNumber)}
        />
        <Button
          label="下一頁"
          disabled={isLastPage}
          onClick={goToNextPage}
          className="mx-1 py-1"
        />
      </div>
      <div className="flex w-1/5"></div>
    </div>
  );
};

export default Pagination;
