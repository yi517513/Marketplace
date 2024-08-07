import axios from "axios";
const AUTH_URL = process.env.REACT_APP_AUTH_URL;

class AuthService {
  login(email, password) {
    return axios.post(
      AUTH_URL + "/login",
      { email, password },
      { withCredentials: true }
    );
  }

  register(email, password, verificationCode) {
    return axios.post(AUTH_URL + "/register", {
      email,
      password,
      verificationCode,
    });
  }

  logout() {
    return axios.post(AUTH_URL + "/logout", {}, { withCredentials: true });
  }

  sendVerifyCode(email) {
    return axios.post(AUTH_URL + "/sendVerifyCode", { email });
  }

  refreshAccessToken() {
    return axios.post(
      AUTH_URL + "/refreshAccessToken ",
      {},
      { withCredentials: true }
    );
  }

  verifyAndRefreshAuth() {
    return axios.get(AUTH_URL + "/verifyAndRefreshAuth", {
      withCredentials: true,
    });
  }
}

const authService = new AuthService();
export default authService;
