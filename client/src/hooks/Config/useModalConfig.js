import ImageManagerContainer from "../../containers/ImageManagerContainer";
import AuthContainer from "../../containers/AuthContainer";
import Dashboard from "../../containers/Dashboard";
import { PATHS } from "../../utils/paths";

const useModalConfig = (path, setParentData) => {
  const modaltMap = {
    [null]: () => {},
    [`ImageManager`]: () => (
      <ImageManagerContainer path={path} setParentImage={setParentData} />
    ),
    [`Login`]: () => <AuthContainer path={PATHS.LOGIN} />,
    [`Register`]: () => <AuthContainer path={PATHS.REGISTER} />,
    [`Orders-buyer`]: () => <Dashboard path={PATHS.ORDERS} />,
    [`Products-seller`]: () => <Dashboard path={PATHS.PRODUCTS} />,
    [`Shipment-seller`]: () => <Dashboard path={PATHS.PENDING_SHIPMENT} />,
    [`History-buyer`]: () => <Dashboard path={PATHS.PURCHASE_HISTORY} />,
    [`History-seller`]: () => <Dashboard path={PATHS.SALES_HISTORY} />,
  };

  const Children = modaltMap[path] || modaltMap[null];

  return Children;
};

export default useModalConfig;
