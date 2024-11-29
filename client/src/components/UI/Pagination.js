import React, { useEffect, useState } from "react";
import { InputWithValidation, NumberStepper } from "./ActionUI";

const Pagination = ({
  currentPageNumber,
  totalPageCount,
  setCurrentPageNumber,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [inputError, setInputError] = useState(null);
  const [steeperErr, setSteeperErr] = useState(null);

  const [displayValue, setDisplayValue] = useState(`/${totalPageCount}`);

  useEffect(() => {
    setDisplayValue(`/${totalPageCount}`);
  }, [currentPageNumber, totalPageCount]);

  return (
    <div className="rwd-text-sm w-full h-full shadow-outline items-center flex justify-between md:grid md:grid-cols-3  ">
      <div className="flex justify-start items-center">
        {/* 決定每頁內容數量 */}
        <InputWithValidation
          label="每頁數量"
          value={itemsPerPage}
          limit={[2, 8]}
          onValidInput={setItemsPerPage}
          className="max-w-40"
          onError={setInputError}
        />
        <div className="text-red-600">{inputError}</div>
      </div>
      <div className="flex justify-center">
        {/* 根據每頁內容數量控制當前頁面 */}
        <NumberStepper
          buttonLabel={["上一頁", "下一頁"]}
          inputLabel="當前頁數"
          showPageDisplay={displayValue}
          buttonClass="py-1"
          value={currentPageNumber}
          setValue={setCurrentPageNumber}
          limit={[1, totalPageCount]}
          onError={setSteeperErr}
          inputClass="h-10"
        />
      </div>
      {steeperErr && (
        <div className="text-red-600 text-start items-center ml-2">
          {steeperErr}
        </div>
      )}
    </div>
  );
};

export default Pagination;
