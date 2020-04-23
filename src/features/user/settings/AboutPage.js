import React from "react";
import { Button, Divider, Form, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import RadioInput from "../../event/form/RadioInput";
import SelectInput from "../../event/form/SelectInput";
import TextInput from "../../event/form/TextInput";
import TextArea from "../../event/form/TextArea";
import { updateProfileInFirestore } from "../../../redux/actions";
import { connect } from "react-redux";

const interests = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

const AboutPage = ({
  pristine,
  submitting,
  handleSubmit,
  updateProfileInFirestore,
}) => {
  const onFormSubmit = (formValues) => {
    return updateProfileInFirestore(formValues);
  };
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group inline>
          <label>Tell us your status: </label>
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="single"
            label="Single"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="relationship"
            label="Relationship"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="married"
            label="Married"
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name="about" component={TextArea} placeholder="About Me" />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Select your interests"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="origin"
          component={TextInput}
          placeholder="Country of Origin"
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size="large"
          positive
          content="Update Profile"
        />
      </Form>
    </Segment>
  );
};

export default connect(null, { updateProfileInFirestore })(
  reduxForm({
    form: "userProfile",
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(AboutPage)
);
