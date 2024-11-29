import withSelectField from "../../Hocs/withSelectField";
import withAuthTools from "../../Hocs/withAuthTools";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from "../../redux/slices/commonSlice";

import Modal from "./Modal";
import { useState } from "react";

const UniversalModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const WithAuthModal = withAuthTools(Modal);
  const WithSelectModal = withSelectField(WithAuthModal);

  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.common.isModal);

  return (
    <WithSelectModal
      isOpen={isModal}
      onClose={() => dispatch(setIsModal(false))}
    />
  );
};

export default UniversalModal;
