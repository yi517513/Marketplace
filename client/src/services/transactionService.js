import axios from "axios";
const TRANSACTIONS_URL = process.env.REACT_APP_TRANSACTIONS_URL;

class TransactionService {
  getOrders(userId) {
    return axios.get(TRANSACTIONS_URL + `/${userId}/orders`, {
      withCredentials: true,
    });
  }

  getInProgress(userId) {
    return axios.get(TRANSACTIONS_URL + `/${userId}/inProgress`, {
      withCredentials: true,
    });
  }

  getPendingShipment(userId) {
    return axios.get(TRANSACTIONS_URL + `/${userId}/pendingShipment`, {
      withCredentials: true,
    });
  }

  getSalesHistory(userId) {
    console.log("getSalesHistory");
    return axios.get(TRANSACTIONS_URL + `/${userId}/salesHistory`, {
      withCredentials: true,
    });
  }

  getPurchaseHistory(userId) {
    console.log("getPurchaseHistory");
    return axios.get(TRANSACTIONS_URL + `/${userId}/purchaseHistory`, {
      withCredentials: true,
    });
  }

  confirmShipment(transactionId) {
    return axios.patch(
      TRANSACTIONS_URL + `/${transactionId}/confirmShipment`,
      {},
      { withCredentials: true }
    );
  }
}

const transactionService = new TransactionService();
export default transactionService;
