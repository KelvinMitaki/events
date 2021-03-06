import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../event/form/TextInput";
import { logInUser } from "../../../redux/actions";
import { connect } from "react-redux";
import SocialLogin from "../SocialLogin/SocialLogin";

const LoginForm = ({ handleSubmit, logInUser, error, loading }) => {
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
        <Button loading={loading} fluid size="large" color="teal">
          Login
        </Button>{" "}
        <Divider horizontal>OR</Divider>
        <SocialLogin />
      </Segment>
    </Form>
  );
};
const wrappedComponent = reduxForm({ form: "LoginForm" })(LoginForm);

const mapStateToProps = (state) => {
  return {
    loading: state.eventsReducer.loading,
  };
};

export default connect(mapStateToProps, { logInUser })(wrappedComponent);
