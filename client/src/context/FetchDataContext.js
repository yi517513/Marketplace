import React, { createContext, useContext, useEffect, useState } from "react";
// import { usePathContext } from "./PathContext";
import useApiHandler from "../hooks/api/useApiHandler";
import { PATH_TO_FETCH } from "../utils/paths";
import { useSelector } from "react-redux";

export const FetchDataContext = createContext();

export const FetchDataProvider = ({ children }) => {
  console.log(`using FetchDataProvider`);
  const userId = useSelector((state) => state.auth.userId);
  const [slug, setSlug] = useState(null);
  const createApiHandler = useApiHandler();
  //   const { staticPath } = usePathContext();
  const staticPath = () => {};
  //   const action = PATH_TO_FETCH[staticPath] || PATH_TO_FETCH.default;

  console.log(`staticPath: ${staticPath}`);

  //   const fetchHandler = createApiHandler(action);

  //   useEffect(() => {
  //     if (fetchHandler) {
  //       slug ? fetchHandler(slug) : fetchHandler(userId);
  //     }
  //     setSlug(null);
  //   }, [staticPath, slug, userId]);

  return (
    <FetchDataContext.Provider value={setSlug}>
      {children}
    </FetchDataContext.Provider>
  );
};

export const useFetchDataContext = () => useContext(FetchDataContext);
