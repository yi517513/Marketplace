import {
  UI_DELETE_MSG,
  UI_SELECT_MSG,
  UI_SET_PRIMARY_MSG,
} from "../../utils/message";
import {
  appendState,
  removeState,
  resetState,
  unShiftState,
} from "../../redux/slices/dataSlice";
import { setSuccessNotify } from "../../redux/slices/commonSlice";
import { useDispatch } from "react-redux";
const useUiReduxHandler = ({ action, storePath }) => {
  const dispatch = useDispatch();

  const uiHandlerMap = {
    handleResetState: (key) => dispatch(resetState({ key })),
    handleSetPrimaryImage: (data) => {
      const message = UI_SET_PRIMARY_MSG[storePath[storePath.length - 1]];
      dispatch(unShiftState({ storePath, data }));
      dispatch(setSuccessNotify(message));
    },
    handleSelect: (data) => {
      const message = UI_SELECT_MSG[storePath[storePath.length - 1]];
      dispatch(appendState({ storePath, data }));
      dispatch(setSuccessNotify(message));
    },
    handleDelete: (data) => {
      const message = UI_DELETE_MSG[storePath[storePath.length - 1]];
      dispatch(removeState({ storePath, data }));
      dispatch(setSuccessNotify(message));
    },
  };

  return uiHandlerMap[action] || (() => {});
};

export default useUiReduxHandler;
