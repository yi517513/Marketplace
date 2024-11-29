import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useApiRequest } from "./ApiRequestContext";
import { useSelector } from "react-redux";

const FetchApiContext = createContext();

export const FetchApiProvider = ({ children }) => {
  const userId = useSelector((state) => state.auth.userId);
  const slug = useSelector((state) => state.common.slug);
  const [fetchAction, setFetchAction] = useState(null);
  const createApiHandler = useApiRequest();

  const fetchHandler = useMemo(
    () => createApiHandler(fetchAction),
    [fetchAction]
  );

  console.log(`fetchAction: ${fetchAction}`);
  useEffect(() => {
    if (fetchHandler) {
      slug ? fetchHandler(slug) : fetchHandler(userId);
    }
  }, [fetchAction, slug, userId]);

  return (
    <FetchApiContext.Provider value={setFetchAction}>
      {children}
    </FetchApiContext.Provider>
  );
};

export const useFetchApi = () => useContext(FetchApiContext);
