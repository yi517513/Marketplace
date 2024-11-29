import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../utils/paths";

const useNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateTo = useCallback(
    ({ path, slug }) => {
      const redirectPath = slug ? `${ROUTES[path]}/${slug}` : ROUTES[path];
      console.log(`redirectPath: ${redirectPath}`);
      navigate(redirectPath);
    },
    [navigate, dispatch]
  );

  return navigateTo;
};

export default useNavigation;
