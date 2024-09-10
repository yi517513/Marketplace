import React from "react";

const Pagination = ({
  handlePrevious,
  handleNext,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        上一頁
      </button>
      <input placeholder={`${currentPage}/${totalPages}`}></input>
      <button onClick={handleNext} disabled={currentPage >= totalPages}>
        下一頁
      </button>
    </div>
  );
};

export default Pagination;
