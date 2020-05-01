import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../event/form/TextInput";
import { registerUser } from "../../../redux/actions";
import { connect } from "react-redux";
import { combineValidators, isRequired } from "revalidate";
import SocialLogin from "../SocialLogin/SocialLogin";

const validate = combineValidators({
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password"),
});

const RegisterForm = ({
  registerUser,
  handleSubmit,
  error,
  submitting,
  invalid,
}) => {
  const onFormSubmit = (formValues) => {
    return registerUser(formValues);
  };
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(onFormSubmit)}>
        {error && (
          <Label basic color="red">
            {error}{" "}
          </Label>
        )}
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button
            disabled={submitting || invalid}
            loading={submitting}
            fluid
            size="large"
            color="teal"
          >
            Register
          </Button>
          <Divider horizontal>OR</Divider>
          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, { registerUser })(
  reduxForm({ form: "RegisterForm", validate })(RegisterForm)
);
