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
        }
      } catch (error) {
        console.log(error.response.data.errorMessage);
        dispatch(logout());
      }
    }, 1 * 5 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
};

export default useRefreshToken;
