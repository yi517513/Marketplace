import axios from "axios";
const AUTH_URL = "http://localhost:8080/api/user";

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
  sendVerifyCode(email) {
    return axios.post(AUTH_URL + "/sendVerifyCode", { email });
  }
  refreshToken() {
    return axios.post(
      AUTH_URL + "/refresh-token",
      {},
      { withCredentials: true }
    );
  }
  logout() {
    return axios.post(AUTH_URL + "/logout", {}, { withCredentials: true });
  }
  checkAuth() {
    return axios.get(AUTH_URL + "/checkAuth", { withCredentials: true });
  }
}

const authService = new AuthService();
export default authService;
