export const calculateItem_WH = (itemsPerPageCount) => {
  let adjustedItemsPerPage;
  let rows;

  if (itemsPerPageCount < 4) {
    adjustedItemsPerPage = itemsPerPageCount;
    rows = 1; // 只顯示一行
  } else if (itemsPerPageCount > 4 && itemsPerPageCount % 2 !== 0) {
    adjustedItemsPerPage = itemsPerPageCount + 1; // 調整為偶數
    rows = 2; // 兩行
  } else {
    adjustedItemsPerPage = itemsPerPageCount;
    rows = 2; // 兩行
  }

  // 根據調整後的項目數量和行數計算每個項目的寬度和高度
  const itemWidth = `calc(100% / ${adjustedItemsPerPage / rows} - 0.5rem)`;
  const itemHeight = `calc(100% / ${rows} - 0.5rem)`;

  return { itemWidth, itemHeight };
};
