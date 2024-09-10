import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import PaymentService from "../../services/paymentService";
import useCRUD from "../../hooks/useCRUD";
import useNavigation from "../../hooks/useNavigation";
import { PATHS } from "../../utils/paths";

const PaymentOptions = () => {
  const location = useLocation();
  const paymentInfo = location.state;

  const { createData } = useCRUD();
  const { navigateTo } = useNavigation();

  useEffect(() => {});

  if (!paymentInfo) {
    return <Navigate to="/forbidden" replace />;
  }

  const handleSelectPaymentMethod = (paymentMethod) => {
    createData(
      PaymentService.createOrder,
      { ...paymentInfo, paymentMethod },
      (success, orderResponse) => {
        // console.log(orderResponse);
        if (success) {
          navigateTo(`${PATHS.PAYMENT_PROCESSING}/${orderResponse._id}`, {
            transactionId: orderResponse._id,
            paymentMethod,
          });
        }
      }
    );
  };

  return (
    <div className="payment-options">
      <div className="buttons-wrapper">
        <button onClick={() => handleSelectPaymentMethod(`creditCard`)}>
          Pay with Credit Card
        </button>
        <button onClick={() => handleSelectPaymentMethod(`PayPal`)}>
          Pay with PayPal
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
