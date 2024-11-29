import axios from "axios";
const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;

class PaymentService {
  createOrder(paymentInfo) {
    console.log(paymentInfo);
    // return fetch(`${PAYMENT_URL}/createOrder`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     owner: paymentInfo.owner,
    //     productId: paymentInfo._id,
    //     price: paymentInfo.price,
    //     amount: paymentInfo.amount,
    //     title: paymentInfo.title,
    //   }),
    //   credentials: "include",
    // });

    return axios.post(PAYMENT_URL + `/createOrder`, paymentInfo, {
      withCredentials: true,
    });
  }

  deleteOrder(transactionId) {
    return axios.delete(PAYMENT_URL + `/${transactionId}`, {
      withCredentials: true,
    });
  }

  getOrder(transactionId) {
    return axios.post(PAYMENT_URL + `/${transactionId}`, {
      withCredentials: true,
    });
  }
}

const paymentService = new PaymentService();
export default paymentService;
