import axios from "axios";
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

class PublicService {
  getAllProducts() {
    return axios.get(PUBLIC_URL);
  }

  getProduct(productId) {
    return axios.get(PUBLIC_URL + `/productDetail/${productId}`);
  }

  processPayment(transactionId, paymentMethod) {
    return axios.post(
      PUBLIC_URL + `/paymentProcessing/${transactionId}`,
      { transactionId, paymentMethod },
      { withCredentials: true }
    );
  }
  createOrder(buyerId, sellerId, product, price, purchaseQuantity) {
    return axios.post(
      PUBLIC_URL + `/paymentOption/${buyerId}`,
      { sellerId, product, price, purchaseQuantity },
      { withCredentials: true }
    );
  }
}

const publicService = new PublicService();
export default publicService;
