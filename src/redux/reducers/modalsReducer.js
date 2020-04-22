import { OPEN_MODAL, CLOSE_MODAL } from "./utils/ActionConstants";

const INITIAL_STATE = {
  modalType: null,
  modalProps: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    case CLOSE_MODAL:
      return { ...state, modalType: null, modalProps: null };
    default:
      return state;
  }
};
