import React, { createContext, useContext } from "react";
import useCountdownMethod from "../hooks/Common/useCountdownMethod";

const CountdownContext = createContext();

export const CountdownProvider = ({ children }) => {
  const countdownMethod = useCountdownMethod();

  return (
    <CountdownContext.Provider value={countdownMethod}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = () => useContext(CountdownContext);
