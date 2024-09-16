import { useParams } from "react-router-dom";
import { serviceMap } from "../../services/serviceMap";

import { PATHS } from "../../utils/paths";

const useServices = (currentPath) => {
  const { productId } = useParams();

  const dynamicPath = currentPath.includes(PATHS.EDIT)
    ? `${PATHS.EDIT}/${productId}`
    : currentPath;

  const services = serviceMap[dynamicPath] || null;

  return { services };
};

export default useServices;
