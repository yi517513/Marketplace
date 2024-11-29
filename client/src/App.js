import "./index.css";
import React from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./routes";
import UniversalModal from "./components/Modal/UniversalModal";

function App() {
  const isAppOnReady = useSelector((state) => state.common.isAppOnReady);

  if (isAppOnReady) {
    return <div> </div>;
  }

  return (
    <>
      <AppRoutes />
      <UniversalModal />
    </>
  );
}

export default App;
