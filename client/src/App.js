import "./index.css";
import React from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./routes";
import ModalCenter from "./containers/ModalCenter";
import useNotifications from "./hooks/Common/useNotifications";

function App() {
  console.log(`App render`);
  const isAppOnReady = useSelector((state) => state.common.isAppOnReady);
  const isModal = useSelector((state) => state.common.isModal);

  // useNotifications();

  // if (isAppOnReady) {
  //   return <div> </div>;
  // }

  // 目前在payment相關的只有檢查local.state來決定是否可以進入，以防止從URL直接進入
  const userHasAccess = true;

  return (
    <>
      <AppRoutes userHasAccess={userHasAccess} />
      {isModal && <ModalCenter />}
    </>
  );
}

export default App;
