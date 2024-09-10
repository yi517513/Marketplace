import React from "react";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import ListItem from "../../UI/ListItem";
import Button from "../../UI/Button";

const ShipmentItem = ({
  item: transaction,
  navigateTo,
  confirmShipment,
  contactBuyer,
}) => {
  if (!transaction) {
    return null;
  }

  const isPaymentCompleted = transaction.paymentStatus === "completed";

  const paymentStatusIcon = isPaymentCompleted ? faCheck : faXmark;
  const shipmentStatusIcon = isPaymentCompleted ? faCheck : faXmark;

  const renderPaymentStatus = () => {
    isPaymentCompleted ? (
      <ListItem
        label="賣家出貨"
        value={transaction.totalAmount}
        icon={shipmentStatusIcon}
      />
    ) : (
      <ListItem label="付款方式" value={transaction.paymentMethod} />
    );
  };

  const renderShipmentStatus = () => {
    paymentStatusIcon && (
      <Button label="聯繫買家" onClick={() => contactBuyer(transaction)} />
    );
    paymentStatusIcon && (
      <Button label="發貨確認" onClick={() => confirmShipment(transaction)} />
    );
  };

  return (
    <div className={isPaymentCompleted ? "complete-status" : "items-list"}>
      <ul>
        <ListItem label="付款狀態" icon={paymentStatusIcon} />
        <ListItem label="發貨數量" value={transaction.purchaseQuantity} />
        <ListItem label="總金額" value={transaction.totalAmount} />
        <ListItem label="總金額" value={transaction.totalAmount} />
        {renderPaymentStatus()}
      </ul>
      <div className="btn-set">
        <Button
          label="瀏覽商品"
          onClick={navigateTo(`DETAIL`, transaction.productId)}
        />
        {renderShipmentStatus()}
      </div>
    </div>
  );
};

export default ShipmentItem;
