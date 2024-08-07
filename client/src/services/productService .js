import axios from "axios";
const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL;

class ProductService {
  postProduct(title, price, inventory, images, description) {
    console.log(title);
    return axios.post(
      PRODUCTS_URL,
      { title, price, inventory, images, description },
      {
        withCredentials: true,
      }
    );
  }
  getAllProducts() {
    return axios.get(PRODUCTS_URL, {
      withCredentials: true,
    });
  }

  getProduct(productId) {
    return axios.get(PRODUCTS_URL + `/${productId}`, {
      withCredentials: true,
    });
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCTS_URL + `/${productId}`, {
      withCredentials: true,
    });
  }

  updateProduct({ title, price, inventory, images, description, productId }) {
    return axios.patch(
      PRODUCTS_URL + `/${productId}`,
      { title, price, inventory, images, description },
      {
        withCredentials: true,
      }
    );
  }
}

const productService = new ProductService();
export default productService;
