import React from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../event/form/TextInput";
import { logInUser } from "../../../redux/actions";
import { connect } from "react-redux";

const LoginForm = ({ handleSubmit, logInUser, error }) => {
  const onFormSubmit = (formValues) => {
    return logInUser(formValues);
  };

  return (
    <Form size="large" onSubmit={handleSubmit(onFormSubmit)}>
      <Segment>
        {error && (
          <Label basic color="red">
            {" "}
            {error}
          </Label>
        )}
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

export default connect(null, { logInUser })(wrappedComponent);
