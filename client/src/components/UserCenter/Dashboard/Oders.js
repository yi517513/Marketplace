import React, { memo } from "react";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import ListItem from "../../UI/ListItem";
import Button from "../../UI/Button";

const OrderItem = memo(
  ({ data: order, navigateTo, deleteOrder, contactSeller }) => {
    if (!order) {
      return null;
    }

    // 付款狀態
    const isPaymentCompleted = order.paymentStatus === "completed";
    const isShipmentCompleted = order.shipmentStatus === "completed";

    // 付款狀態icon
    const paymentStatusIcon = isPaymentCompleted ? faCheck : faXmark;
    const shipmentStatusIcon = isShipmentCompleted ? faCheck : faXmark;

    // 根據付款狀態渲染對應的按鈕
    const renderActionButtons = () => {
      if (!isPaymentCompleted) {
        return (
          <>
            <Button label="刪除訂單" onClick={() => deleteOrder(order)} />
            <Button
              label="立即付款"
              onClick={() => navigateTo(`PAYMENT`, order.transactionId)}
            />
          </>
        );
      }
      return <Button label="聯繫賣家" onClick={() => contactSeller(order)} />;
    };

    return (
      <div className={isPaymentCompleted ? "complete-status" : "items-list"}>
        <ul>
          <ListItem label="付款狀態" icon={paymentStatusIcon} />
          <ListItem label="購買數量" value={order.purchaseQuantity} />
          <ListItem label="總金額" value={order.totalAmount} />
          <ListItem
            label={isPaymentCompleted ? "賣家出貨" : "付款方式"}
            icon={shipmentStatusIcon}
          />
        </ul>
        <div className="btn-set">
          <Button
            label="瀏覽商品"
            onClick={() => navigateTo(`DETAIL`, order.productId)}
          />
          {renderActionButtons()}
        </div>
      </div>
    );
  }
);

export default OrderItem;
