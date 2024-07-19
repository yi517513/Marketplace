import axios from "axios";
const USERCENTER_URL = "http://localhost:8080/api/userCenter";

class UserCenter {
  profile() {
    return axios.get(USERCENTER_URL, { withCredentials: true });
  }

  updateUserProfile(userProfile) {
    console.log(userProfile);
    const { username, birthday, gender, phone, address } = userProfile;
    return axios.patch(
      USERCENTER_URL + "/updateUserProfile",
      { username, birthday, gender, phone, address },
      { withCredentials: true }
    );
  }
}

const userCenter = new UserCenter();
export default userCenter;
