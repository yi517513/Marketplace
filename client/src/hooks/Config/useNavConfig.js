import useNavigation from "../useNavigation";
import useAsyncAction from "../Common/useAsyncAction";
import useNavigation from "../useNavigation";
import AuthService from "../../services/authService";

const useNavConfig = () => {
  const { navigateTo } = useNavigation();
  const { asyncAction } = useAsyncAction();

  const handleLogout = () => {
    asyncAction(AuthService.logout, {}, {}, (success) => {
      if (success) {
        navigateTo("HOME");
      }
    });
  };
  return handleLogout;
};

export default useNavConfig;
