import React from "react";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";
import { useConfigContext } from "../../context/ConfigContext";
import withPagination from "../../Hocs/withPagination";
import withLoading from "../../Hocs/withLoading";

const ProductItem = ({ paginatedData: products }) => {
  const { apiHandlers, uiHandlers } = useConfigContext();
  const { handleToggleProductStatus, handleDeleteProduct } = apiHandlers;
  const { navigateTo } = uiHandlers;

  return (
    <ul className="space-y-2">
      {products.map((product) => {
        const InStock = product.inventory > 0;
        const hasPaid = product.pendingShipment > 0;

        return (
          <li
            key={product._id}
            className="my-2 p-4 border border-slate-300 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex text-xl basis-5/6 gap-8">
                {hasPaid && (
                  <ListItem label="移交數量" value={product.pendingShipment} />
                )}
                <ListItem label="標題" value={product.title} />
                <ListItem label="價格" value={product.price} />
                <ListItem
                  label="庫存"
                  value={product.inventory}
                  className={InStock ? "" : "unavailable"}
                />
                <ListItem label="詳細" value={product.description} />
              </div>
              <div className="flex  basis-1/6  gap-2 ">
                <Button
                  label="瀏覽"
                  onClick={() =>
                    navigateTo({ path: `DETAIL`, slug: product._id })
                  }
                  className="py-2"
                />
                <Button
                  label="編輯"
                  onClick={() => {
                    console.log(product._id);
                    navigateTo({ path: `EDIT`, slug: product._id });
                  }}
                  className="py-2"
                />
                <Button
                  label={product.status === "available" ? "上架" : "下架"}
                  onClick={() => handleToggleProductStatus(product._id)}
                  disabled={InStock}
                  className="py-2"
                />
                <Button
                  label="刪除"
                  onClick={() => handleDeleteProduct(product._id)}
                  disabled={hasPaid}
                  className="py-2"
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const EnhanceProductItem = () => {
  const { loading, selectedData } = useConfigContext();

  const PaginatedProductItem = withPagination(ProductItem);
  const LoadedProductItem = withLoading(PaginatedProductItem);

  return <LoadedProductItem originalData={selectedData} loading={loading} />;
};

export default EnhanceProductItem;
