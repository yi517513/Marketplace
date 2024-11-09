import withSelectField from "../Hocs/withSelectField";
import withAuthTools from "../Hocs/withAuthTools";
import Modal from "../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from "../redux/slices/commonSlice";

const EnhancedModal = withAuthTools(withSelectField(Modal));

const ModalCenter = (props) => {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.common.isModal);

  const handleClose = () => {
    dispatch(setIsModal(false));
  };

  return <EnhancedModal isOpen={isModal} onClose={handleClose} {...props} />;
};

export default ModalCenter;
