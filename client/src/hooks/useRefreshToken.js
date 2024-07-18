import { useEffect } from "react";
import AuthService from "../services/authService";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await AuthService.refreshToken();
        console.log(response.data.successMessage);
        if (response.status !== 200) {
          dispatch(logout());
          alert("請重新登入");
        }
      } catch (error) {
        window.alert(error.response.data.errorMessage);
        dispatch(logout());
        alert("請重新登入");
      }
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
};

export default useRefreshToken;
