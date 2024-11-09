import AuthForm from "../../components/Auth/AuthForm";
import { ROUTES } from "../../utils/paths";
import withCustomPath from "../../Hocs/withCustomPath";
import HistoryItem from "../../components/UserCenter/HistoryItem";
import OrderItem from "../../components/UserCenter/OrderItem";
import ProductItem from "../../components/UserCenter/ProductItem";
import ShipmentItem from "../../components/UserCenter/ShipmentItem";
import ImageManager from "../../components/Modal/ImageManager";

const WrappedImageManager = withCustomPath(ImageManager);
const WrappedAuthForm = withCustomPath(AuthForm);
const WrappedOrderItem = withCustomPath(OrderItem);
const WrappedProductItem = withCustomPath(ProductItem);
const WrappedShipmentItem = withCustomPath(ShipmentItem);
const WrappedHistoryItem = withCustomPath(HistoryItem);

const useModalSelect = (customPath) => {
  console.log(`using useModalSelect`);
  const modalMap = {
    [null]: () => {},
    [`ImageManager`]: () => <WrappedImageManager customPath={"ImageManager"} />,
    [`Login`]: () => <WrappedAuthForm customPath={ROUTES.LOGIN} />,
    [`Register`]: () => <WrappedAuthForm customPath={ROUTES.REGISTER} />,
    [`Orders-buyer`]: () => <WrappedOrderItem customPath={ROUTES.ORDERS} />,
    [`Products-seller`]: () => (
      <WrappedProductItem customPath={ROUTES.PRODUCTS} />
    ),
    [`Shipment-seller`]: () => (
      <WrappedShipmentItem customPath={ROUTES.SHIPMENT} />
    ),
    [`History-buyer`]: () => (
      <WrappedHistoryItem customPath={ROUTES.PURCHASED} />
    ),
    [`History-seller`]: () => <WrappedHistoryItem customPath={ROUTES.SOLD} />,
  };

  const Children = modalMap[customPath] || modalMap[null];

  return Children;
};

export default useModalSelect;
