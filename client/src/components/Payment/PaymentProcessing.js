import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import PaymentService from "../../services/paymentService";

const PaymentProcessing = () => {
  const location = useLocation();
  const paymentInfo = location.state;

  if (!paymentInfo) {
    return <Navigate to="/forbidden" replace />;
  }

  // const handlePayment = () => {
  //   const { transactionId, paymentMethod } = paymentInfo;
  //   updateData(
  //     PaymentService.processPayment,
  //     { transactionId, paymentMethod },
  //     (success, data) => {
  //       if (success) {
  //       }
  //     }
  //   );
  // };

  return <div>{/* <button onClick={handlePayment}>購買</button> */}</div>;
};

export default PaymentProcessing;
