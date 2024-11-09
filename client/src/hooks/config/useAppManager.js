import useRefreshToken from "../auth/useRefreshToken";
import useCheckAuth from "../auth/useCheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsAppOnReady } from "../../redux/slices/commonSlice";

const useAppManager = () => {
  console.log(`using useAppManager`);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 刷新網頁時，重新配置狀態
  const { checkAuth } = useCheckAuth(isAuthenticated, userId);
  // 定時刷新access token
  useRefreshToken(isAuthenticated);

  useEffect(() => {
    const manageAuth = async () => {
      await checkAuth(isAuthenticated, userId);
      dispatch(setIsAppOnReady(false));
    };

    manageAuth();
  }, [dispatch]);
};

export default useAppManager;
