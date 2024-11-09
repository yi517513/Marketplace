import axios from "axios";
const AUTH_URL = process.env.REACT_APP_AUTH_URL;

class AuthService {
  login(account) {
    return axios.post(AUTH_URL + "/login", account, { withCredentials: true });
  }

  register(createVariables) {
    const { email, password, verificationCode } = createVariables;
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

  checkAuth() {
    return axios.get(AUTH_URL + "/checkAuth", { withCredentials: true });
  }
}

const authService = new AuthService();
export default authService;
