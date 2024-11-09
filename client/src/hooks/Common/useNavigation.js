import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../utils/paths";

const useNavigation = () => {
  console.log(`using useNavigation`);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateTo = useCallback(
    ({ path, slug }) => {
      console.log(`navigateTo is being init`);
      const redirectPath = slug ? `${ROUTES[path]}/${slug}` : ROUTES[path];
      navigate(redirectPath);
    },
    [navigate, dispatch]
  );

  return { navigateTo };
};

export default useNavigation;
