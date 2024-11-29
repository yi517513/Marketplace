import Auth from "../../pages/Auth";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import SoldHistory from "../../pages/SoldHistory";
import PurchasedHistory from "../../pages/PurchasedHistory";
import ImageManager from "../../pages/ImageManager";

import OrderItem from "../../components/UserCenter/OrderItem";
import ProductItem from "../../components/UserCenter/ProductItem";
import ShipmentItem from "../../components/UserCenter/ShipmentItem";

const useModalSelect = (modalType) => {
  const modalMap = {
    [null]: () => {},
    [`ImageManager`]: () => <ImageManager />,
    [`Auth`]: () => <Auth />,
    [`Login`]: () => <Login />,
    [`Register`]: () => <Register />,
    [`Orders-buyer`]: () => <OrderItem />,
    [`Products-seller`]: () => <ProductItem />,
    [`Shipment-seller`]: () => <ShipmentItem />,
    [`History-buyer`]: () => <PurchasedHistory />,
    [`History-seller`]: () => <SoldHistory />,
  };

  const Children = modalMap[modalType] || modalMap[null];

  return Children;
};

export default useModalSelect;
