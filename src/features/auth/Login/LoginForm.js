import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../event/form/TextInput";
import { logInUser, closeModal } from "../../../redux/actions";
import { connect } from "react-redux";

const LoginForm = ({ handleSubmit, logInUser, closeModal }) => {
  const onFormSubmit = (formValues) => {
    logInUser(formValues);
    closeModal();
  };
  return (
    <Form error size="large" onSubmit={handleSubmit(onFormSubmit)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};
const wrappedComponent = reduxForm({ form: "LoginForm" })(LoginForm);

export default connect(null, { logInUser, closeModal })(wrappedComponent);
