import axios from "axios";
const USERCENTER_URL = "http://localhost:8080/api/userCenter";

class UserCenter {
  profile() {
    return axios.get(USERCENTER_URL, { withCredentials: true });
  }

  updateUserProfile(userProfile) {
    const { username, birthday, gender, phone, address } = userProfile;
    return axios.patch(
      USERCENTER_URL + "/updateUserProfile",
      { username, birthday, gender, phone, address },
      { withCredentials: true }
    );
  }

  publishProduct(formData) {
    return axios.post(USERCENTER_URL + "/publishProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  }
}

const userCenter = new UserCenter();
export default userCenter;
