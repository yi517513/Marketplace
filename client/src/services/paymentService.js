import axios from "axios";
const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;

class PaymentService {
  createOrder(paymentInfo) {
    const { buyerId } = paymentInfo;
    return axios.post(PAYMENT_URL + `/options/${buyerId}`, paymentInfo, {
      withCredentials: true,
    });
  }

  deleteOrder(transactionId) {
    return axios.delete(PAYMENT_URL + `/${transactionId}`, {
      withCredentials: true,
    });
  }

  processPayment(paymentInfo) {
    const { transactionId } = paymentInfo;
    return axios.post(
      PAYMENT_URL + `/processing/${transactionId}`,
      paymentInfo,
      { withCredentials: true }
    );
  }
}

const paymentService = new PaymentService();
export default paymentService;
