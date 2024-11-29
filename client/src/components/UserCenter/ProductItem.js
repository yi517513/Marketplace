import React from "react";
import { ListItem } from "../UI/BaseUI";
import { NavigateButton, SubmitButton } from "../UI/ActionUI";
import { ImageWithActions } from "../ImageUI/ImageContainer";
import Pagination from "../UI/Pagination";

const ProductItem = React.memo(
  ({ paginatedData: products, paginationActions }) => (
    <div className="w-full h-full flex flex-col justify-between gap-4">
      <ul>
        {products.map((product) => {
          const InStock = product.inventory > 0;
          const hasPaid = product.pendingShipment > 0;

          return (
            <li
              key={product._id}
              className="mb-2 border border-slate-300 hover:bg-gray-200 cursor-pointer"
            >
              <div
                className="grid grid-cols-[1fr_2fr] gap-2 max-h-36 items-center
              md:grid-cols-[1fr_4fr] lg:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_5fr] "
              >
                {/* 圖片區塊 */}
                <div className="h-36 md:h-32 lg:h-30">
                  <ImageWithActions
                    image={product.images[0]}
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
                        value={product.title}
                        className=" md:max-w-48"
                      />
                    </div>
                    <div className="w-full flex justify-between md:justify-start md:gap-8">
                      <ListItem label="價格" value={`${product.price} 元`} />
                      <ListItem
                        label="庫存"
                        value={product.inventory}
                        className={InStock ? "" : "unavailable"}
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
                      slug={product._id}
                      className="md:p-1"
                    />
                    <NavigateButton
                      label="編輯"
                      path="EDIT"
                      slug={product._id}
                      className="md:p-1"
                    />
                    <SubmitButton
                      label="刪除"
                      method="deleteProduct"
                      payload={product._id}
                      disabled={hasPaid}
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

export default ProductItem;
