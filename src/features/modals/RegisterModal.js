import React, { Component } from "react";
import RegisterForm from "../auth/Register/RegisterForm";

import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions";

class RegisterModal extends Component {
  render() {
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModal}>
        <Modal.Header>Sign Up to events!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, { closeModal })(RegisterModal);
