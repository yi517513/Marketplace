import useApiHandlers from "../handler/useApiHandlers";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";

const useCheckAuth = () => {
  console.log(`using useCheckAuth`);
  const dispatch = useDispatch();
  const { apiHandlers } = useApiHandlers(`CheckAuth`);
  const { handleCheckAuth } = apiHandlers;

  const checkAuth = async (isAuthenticated, userId) => {
    if (isAuthenticated) {
      dispatch(setAuth({ userId }));
    }

    await handleCheckAuth();
  };

  return { checkAuth };
};

export default useCheckAuth;
