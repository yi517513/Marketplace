import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { DYNAMIC_ROUTES } from "../utils/paths";

export const PathContext = createContext();

export const PathProvider = ({ children }) => {
  console.log(`using PathProvider`);
  const [customPath, setCustomPath] = useState(null);
  // const location = useLocation();

  const location = () => {};

  const getStaticPath = useCallback(() => {
    console.log(`getStaticPath init`);
    if (customPath) {
      return customPath;
    }

    const matcedPath = Object.values(DYNAMIC_ROUTES).find((route) =>
      location.pathname?.includes(route)
    );

    return matcedPath ? matcedPath : location.pathname;
  }, [location.pathname]);

  const staticPath = getStaticPath();

  useEffect(() => {
    setCustomPath(null);
  }, [location.pathname]);

  useEffect(() => {
    console.log("Location changed:", location.pathname);
  }, [location.pathname]);

  return (
    <PathContext.Provider value={{ staticPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePathContext = () => useContext(PathContext);
