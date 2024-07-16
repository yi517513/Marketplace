import axios from "axios";
const USERCENTER_URL = "http://localhost:8080/api/userCenter";

class UserCenter {
  profile() {
    return axios.get(USERCENTER_URL, { withCredentials: true });
  }
}

const userCenter = new UserCenter();
export default userCenter;
