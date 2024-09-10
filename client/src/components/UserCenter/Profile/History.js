import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ListItem from "../../UI/ListItem";
import Button from "../../UI/Button";

const HistoryItem = ({ item: transaction, navigateTo }) => {
  if (!transaction) {
    return null;
  }
  return (
    <div className="complete-status">
      <ul>
        <ListItem label="付款狀態" icon={faCheck} />
        <ListItem label="數量" value={transaction.purchaseQuantity} />
        <ListItem label="總金額" value={transaction.totalAmount} />
        <ListItem 賣家出貨="數量" icon={faCheck} />
      </ul>
      <div className="btn-set">
        <Button
          label="瀏覽商品"
          onClick={navigateTo(`DETAIL`, transaction.productId)}
        />
        <Button label="交易資訊" onClick={() => {}} />
      </div>
    </div>
  );
};

export default HistoryItem;
