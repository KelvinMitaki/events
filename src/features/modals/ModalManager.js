import React from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { connect } from "react-redux";

const modalLookup = {
  LoginModal,
  RegisterModal,
};

const ModalManager = ({ modalType, modalProps }) => {
  const ModalComponent = modalLookup[modalType];

  return modalType && <ModalComponent {...modalProps} />;
};

const mapStateToProps = (state) => {
  return {
    modalType: state.modals.modalType,
    modalProps: state.modals.modalProps,
  };
};

export default connect(mapStateToProps)(ModalManager);
