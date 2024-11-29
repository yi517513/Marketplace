import axios from "axios";
const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL;

class ProductService {
  postProduct(createVariables) {
    const { title, price, inventory, images, description } = createVariables;
    return axios.post(
      PRODUCTS_URL,
      { title, price, inventory, images, description },
      {
        withCredentials: true,
      }
    );
  }
  getUserProducts() {
    return axios.get(PRODUCTS_URL, {
      withCredentials: true,
    });
  }

  getProductById(productId) {
    console.log(`getProductById`);
    return axios.get(PRODUCTS_URL + `/${productId}`, {
      withCredentials: true,
    });
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCTS_URL + `/${productId}`, {
      withCredentials: true,
    });
  }

  editProduct(productInfo) {
    const { _id: productId } = productInfo;
    console.log(productId);
    return axios.patch(PRODUCTS_URL + `/${productId}`, productInfo, {
      withCredentials: true,
    });
  }

  getPendingShipment() {
    return axios.get(PRODUCTS_URL + `/getPendingShipment`, {
      withCredentials: true,
    });
  }
}

const productService = new ProductService();
export default productService;
