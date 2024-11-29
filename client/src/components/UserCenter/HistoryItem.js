import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, ListItem } from "../UI/BaseUI";
import { NavigateButton } from "../UI/ActionUI";
import { ImageWithActions } from "../ImageUI/ImageContainer";
import Pagination from "../UI/Pagination";

// const HistoryItem1 = ({ transactions }) => (
//   <ul className="space-y-2">
//     {transactions.map((transaction) => (
//       <li
//         key={transaction._id}
//         className="my-2 p-4 border border-slate-300 hover:bg-gray-200 cursor-pointer"
//       >
//         <div className="flex justify-between items-center">
//           <div className="flex text-xl basis-5/6 gap-8">
//             <ListItem label="付款狀態" icon={faCheck} />
//             <ListItem label="數量" value={transaction.purchaseQuantity} />
//             <ListItem label="總金額" value={transaction.totalAmount} />
//             <ListItem
//               label="賣家出貨"
//               value={transaction.sellerQuantity}
//               icon={faCheck}
//             />
//           </div>
//           <div className="flex basis-1/6  gap-2">
//             <NavigateButton
//               path="DETAIL"
//               slug={transaction.productId}
//               label="瀏覽"
//               className="py-2"
//             />

//             <Button label="資訊" onClick={() => {}} className="py-2 " />
//           </div>
//         </div>
//       </li>
//     ))}
//   </ul>
// );

const HistoryItem = React.memo(
  ({ paginatedData: transactions, paginationActions }) => (
    <div className="w-full h-full flex flex-col justify-between gap-4">
      <ul>
        {transactions.map((transaction) => {
          return (
            <li
              key={transaction._id}
              className="mb-2 border border-slate-300 hover:bg-gray-200 cursor-pointer"
            >
              <div
                className="grid grid-cols-[1fr_2fr] gap-2 max-h-36 items-center
              md:grid-cols-[1fr_4fr] lg:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_5fr] "
              >
                {/* 圖片區塊 */}
                <div className="h-36 md:h-32 lg:h-30">
                  <ImageWithActions
                    image={transaction.image}
                    className="md:min-w-32 md:max-w-64 min-h-full"
                    hasDelBtn={false}
                  />
                </div>
                {/* 圖片以外區塊 */}
                <div className="flex flex-col h-full justify-around p-1 md:flex-row md:truncate md:justify-between">
                  {/* 文字區塊 */}
                  <div className="flex flex-col justify-around h-full w-full md:items-start ">
                    <div className="flex w-full">
                      <ListItem
                        label="訂單編號"
                        value={transaction._id}
                        className=" md:max-w-48"
                      />
                    </div>
                    <div className="w-full flex justify-between md:justify-start md:gap-8">
                      <ListItem
                        label="總金額"
                        value={`${transaction.totalAmount} 元`}
                      />
                    </div>
                  </div>
                  {/* 按鈕區塊 */}
                  <div
                    className="flex flex-row gap-2 items-center justify-center 
                md:flex-row md:gap-4 lg:mr-2"
                  >
                    <NavigateButton
                      label="瀏覽"
                      path="DETAIL"
                      slug={transaction.productId}
                      className="md:p-1"
                    />
                    <NavigateButton
                      label="資訊"
                      // path="EDIT"
                      slug={transaction._id}
                      className="md:p-1"
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <Pagination {...paginationActions} />
      </div>
    </div>
  )
);

export default HistoryItem;
