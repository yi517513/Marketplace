import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { DYNAMIC_ROUTES } from "../../utils/paths";

const useStaticRoute = () => {
  console.log(`using useStaticRoute`);
  const location = useLocation();
  const pathname = location.pathname;

  const getStaticPath = (pathname) => {
    const matchedPath = Object.values(DYNAMIC_ROUTES).find((route) =>
      pathname?.includes(route)
    );
    return matchedPath || pathname;
  };

  const staticPath = useMemo(() => getStaticPath(pathname), [pathname]);

  return staticPath;
};

export default useStaticRoute;
