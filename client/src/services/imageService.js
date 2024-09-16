import axios from "axios";
const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

class ImageService {
  uploadImage(formData) {
    return axios.post(IMAGES_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  }
  getImages() {
    return axios.get(IMAGES_URL, {
      withCredentials: true,
    });
  }
  deleteImage(imageId) {
    return axios.delete(IMAGES_URL + `/${imageId}`, { withCredentials: true });
  }
}

const imageService = new ImageService();
export default imageService;
