import { useApiRequest } from "../../context/ApiRequestContext";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";

const useCheckAuth = () => {
  const dispatch = useDispatch();
  const createApiHandler = useApiRequest();
  const handleCheckAuth = createApiHandler(`checkAuth`);

  const checkAuth = async (isAuthenticated, userId) => {
    if (isAuthenticated) {
      dispatch(setAuth({ userId }));
    }

    await handleCheckAuth();
  };

  return checkAuth;
};

export default useCheckAuth;
