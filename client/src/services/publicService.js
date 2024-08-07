import axios from "axios";
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

class PublicService {
  getAllProducts() {
    return axios.get(PUBLIC_URL, {
      withCredentials: true,
    });
  }

  getProduct(productId) {
    return axios.get(PUBLIC_URL + `/productDetail/${productId}`, {
      withCredentials: true,
    });
  }
}

const publicService = new PublicService();
export default publicService;
