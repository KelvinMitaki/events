import React from "react";
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon,
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../event/form/TextInput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  matchesField,
} from "revalidate";
import { updatePassword } from "../../../redux/actions";
import { connect } from "react-redux";

const validate = combineValidators({
  newPassword1: isRequired({ message: "Please enter a password" }),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm your new password" }),
    matchesField("newPassword1")({ message: "Passwords do not match" })
  )(),
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  updatePassword,
  handleSubmit,
  providerId,
}) => {
  const onFormSubmit = (formValues) => {
    updatePassword(formValues);
  };

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId[0].providerId === "password" && (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />

            <Divider />

            <Button
              disabled={invalid || submitting}
              size="large"
              positive
              content="Update Password"
            />
          </Form>
        </div>
      )}
      {providerId && providerId[0].providerId === "google.com" && (
        <div>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google plus">
            <Icon name="google plus" />
            Go to Google
          </Button>
        </div>
      )}
    </Segment>
  );
};
const mapStateToProps = (state) => {
  return {
    providerId: state.firebase.auth.providerData,
  };
};
export default connect(mapStateToProps, { updatePassword })(
  reduxForm({ form: "account", validate })(AccountPage)
);
