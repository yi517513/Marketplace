import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import PaymentService from "../../services/paymentService";

const PaymentProcessing = () => {
  const location = useLocation();
  const paymentInfo = location.state;

  console.log(paymentInfo);

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
  //         // console.log(data);
  //       }
  //     }
  //   );
  // };

  return <div>{/* <button onClick={handlePayment}>購買</button> */}</div>;
};

export default PaymentProcessing;
