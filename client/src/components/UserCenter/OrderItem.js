import React from "react";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";
import { useConfigContext } from "../../context/ConfigContext";
import withPagination from "../../Hocs/withPagination";
import withLoading from "../../Hocs/withLoading";

const OrderItem = ({ paginatedData: orders }) => {
  const { apiHandlers, uiHandlers } = useConfigContext();

  const { deleteOrder } = apiHandlers;
  const { navigateTo, contactSeller } = uiHandlers;

  // 根據付款狀態渲染對應的按鈕
  const renderActionButtons = (isPaymentCompleted) => {
    if (isPaymentCompleted) {
      return (
        <>
          <Button label="刪除訂單" onClick={() => deleteOrder(orders)} />
          <Button
            label="立即付款"
            onClick={() => navigateTo(`PAYMENT`, orders.transactionId)}
          />
        </>
      );
    }
    return <Button label="聯繫賣家" onClick={() => contactSeller(orders)} />;
  };

  return (
    <ul className="space-y-2">
      {orders.map((order) => {
        // 付款狀態
        const isPaymentCompleted = orders.paymentStatus === "completed";
        const isShipmentCompleted = orders.shipmentStatus === "completed";

        // 付款狀態icon
        const paymentStatusIcon = isPaymentCompleted ? faCheck : faXmark;
        const shipmentStatusIcon = isShipmentCompleted ? faCheck : faXmark;

        return (
          <li
            key={order._id}
            className="my-2 p-4 border border-slate-300 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex text-xl basis-5/6 gap-8">
                <ListItem label="付款狀態" icon={paymentStatusIcon} />
                <ListItem label="購買數量" value={order.purchaseQuantity} />
                <ListItem label="總金額" value={order.totalAmount} />
                <ListItem
                  label={isPaymentCompleted ? "賣家出貨" : "付款方式"}
                  icon={shipmentStatusIcon}
                />
              </div>
              <div className="flex  basis-1/6  gap-2 ">
                <Button
                  label="瀏覽商品"
                  onClick={() =>
                    navigateTo({ path: `DETAIL`, slug: order.productId })
                  }
                />
                {renderActionButtons(isPaymentCompleted)}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const EnhanceOrderItem = () => {
  const { loading, selectedData } = useConfigContext();

  const PaginatedOrderItem = withPagination(OrderItem);
  const LoadedOrderItem = withLoading(PaginatedOrderItem);

  return <LoadedOrderItem originalData={selectedData} loading={loading} />;
};
export default EnhanceOrderItem;
