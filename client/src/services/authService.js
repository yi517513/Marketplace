import axios from "axios";
const AUTH_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(AUTH_URL + "/login", { email, password });
  }
}

const authService = new AuthService();
export default authService;
