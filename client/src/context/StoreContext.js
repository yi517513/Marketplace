import React, { createContext, useContext } from "react";
import useStoreData from "../hooks/config/useStoreData";
import { PATH_TO_KEY } from "../utils/paths";
// import { usePathContext } from "./PathContext";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  console.log(`using StoreProvider`);
  // const { staticPath } = usePathContext();
  const staticPath = () => {};
  const data = useStoreData(PATH_TO_KEY[staticPath]);

  const { selectedData } = data;
  console.log(`selectedData: ${selectedData}`);

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
};

export const useStoreContext = () => useContext(StoreContext);
