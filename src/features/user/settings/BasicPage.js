import React, { Component } from "react";
import TextInput from "../../event/form/TextInput";
import DateInput from "../../event/form/DateInput";
import RadioInput from "../../event/form/RadioInput";

import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { addYears } from "date-fns";
import { updateProfileInFirestore } from "../../../redux/actions";
import { connect } from "react-redux";

class BasicsPage extends Component {
  onFormSubmit = (formValues) => {
    let newFormValues;
    if (formValues.dateOfBirth) {
      newFormValues = {
        ...formValues,
        dateOfBirth: formValues.dateOfBirth.toString(),
      };
    } else {
      newFormValues = { ...formValues };
    }
    this.props.updateProfileInFirestore(newFormValues);
  };
  render() {
    const { pristine, submitting } = this.props;
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <Field
            width={8}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            width={8}
            name="dateOfBirth"
            component={DateInput}
            placeholder="Date of Birth"
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            maxDate={addYears(new Date(), -18)}
          />
          <Field
            name="city"
            placeholder="Home Town"
            label="Female"
            component={TextInput}
            width={8}
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
  }
}

export default connect(null, { updateProfileInFirestore })(
  reduxForm({
    form: "userProfile",
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(BasicsPage)
);
