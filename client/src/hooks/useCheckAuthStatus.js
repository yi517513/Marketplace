import AuthService from "../services/authService";
import { checkAuth } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useCheckAuthStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await AuthService.checkAuth();
        if (response.status === 200) {
          dispatch(checkAuth(true));
        } else {
          dispatch(checkAuth(false));
        }
      } catch (error) {
        console.log("請重新登入");
        dispatch(checkAuth(false));
      }
    };
    checkAuthStatus();
  }, [dispatch]);
};

export default useCheckAuthStatus;
