import React from "react";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";
import { useConfigContext } from "../../context/ConfigContext";
import withPagination from "../../Hocs/withPagination";
import withLoading from "../../Hocs/withLoading";

const ShipmentItem = ({ paginatedData: transactions }) => {
  const { apiHandlers, uiHandlers } = useConfigContext();
  const { confirmShipment, contactBuyer } = apiHandlers;
  const { navigateTo } = uiHandlers;

  const renderPaymentStatus = (
    transaction,
    isPaymentCompleted,
    shipmentStatusIcon
  ) => {
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

  const renderShipmentStatus = (transaction, paymentStatusIcon) => {
    paymentStatusIcon && (
      <Button label="聯繫買家" onClick={() => contactBuyer(transaction)} />
    );
    paymentStatusIcon && (
      <Button label="發貨確認" onClick={() => confirmShipment(transaction)} />
    );
  };

  return (
    <ul className="space-y-2">
      {transactions.map((transaction) => {
        const isPaymentCompleted = transaction.paymentStatus === "completed";

        const paymentStatusIcon = isPaymentCompleted ? faCheck : faXmark;
        const shipmentStatusIcon = isPaymentCompleted ? faCheck : faXmark;

        return (
          <li
            key={transaction._id}
            className="my-2 p-4 border border-slate-300 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex text-xl basis-5/6 gap-8">
                <ListItem label="付款狀態" icon={paymentStatusIcon} />
                <ListItem
                  label="發貨數量"
                  value={transaction.purchaseQuantity}
                />
                <ListItem label="總金額" value={transaction.totalAmount} />
                <ListItem label="總金額" value={transaction.totalAmount} />
              </div>
              <div className="flex  basis-1/6  gap-2 ">
                <Button
                  label="瀏覽商品"
                  onClick={() => navigateTo(`DETAIL`, transaction.productId)}
                />
                {renderPaymentStatus(transaction)}
                {renderShipmentStatus(paymentStatusIcon)}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const EnhancedShipmentItem = () => {
  const { loading, selectedData } = useConfigContext();

  const PaginatedShipmentItem = withPagination(ShipmentItem);
  const LoadedShipmentItem = withLoading(PaginatedShipmentItem);

  return <LoadedShipmentItem originalData={selectedData} loading={loading} />;
};

export default EnhancedShipmentItem;
