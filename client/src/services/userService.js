import axios from "axios";
const USER_URL = process.env.REACT_APP_USER_URL;

class UserService {
  getProfile() {
    return axios.get(USER_URL, { withCredentials: true });
  }

  updateProfile(userProfile) {
    const { username, birthday, gender, phone, address } = userProfile;
    return axios.patch(
      USER_URL,
      { username, birthday, gender, phone, address },
      { withCredentials: true }
    );
  }
}

const userService = new UserService();
export default userService;
