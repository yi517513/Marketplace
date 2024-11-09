import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";
import withPagination from "../../Hocs/withPagination";
import withLoading from "../../Hocs/withLoading";
import { useStoreContext } from "../../context/StoreContext";
import { NavigateButton } from "../UI/ButtonHandler";

const HistoryItem = ({ paginatedData: transactions }) => {
  return (
    <ul className="space-y-2">
      {transactions.map((transaction) => (
        <li
          key={transaction._id}
          className="my-2 p-4 border border-slate-300 hover:bg-gray-200 cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div className="flex text-xl basis-5/6 gap-8">
              <ListItem label="付款狀態" icon={faCheck} />
              <ListItem label="數量" value={transaction.purchaseQuantity} />
              <ListItem label="總金額" value={transaction.totalAmount} />
              <ListItem
                label="賣家出貨"
                value={transaction.sellerQuantity}
                icon={faCheck}
              />
            </div>
            <div className="flex basis-1/6  gap-2">
              <NavigateButton
                path="DETAIL"
                slug={transaction.productId}
                label="瀏覽商品"
                className="py-2"
              />

              <Button label="交易資訊" onClick={() => {}} className="py-2 " />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const EnhanceHistoryItem = () => {
  const { loading, selectedData } = useStoreContext();

  const PaginatedHistoryItem = withPagination(HistoryItem);
  const LoadedHistoryItem = withLoading(PaginatedHistoryItem);

  return <LoadedHistoryItem originalData={selectedData} loading={loading} />;
};

export default EnhanceHistoryItem;
