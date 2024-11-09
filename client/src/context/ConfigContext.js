import React, { createContext, useContext } from "react";
import useAppManager from "../hooks/config/useAppManager";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  console.log(`using ConfigProvider`);
  useAppManager();

  return <ConfigContext.Provider value={{}}>{children}</ConfigContext.Provider>;
};

export const useConfigContext = () => useContext(ConfigContext);
