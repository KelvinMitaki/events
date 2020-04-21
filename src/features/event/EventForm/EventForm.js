import React, { Component } from "react";
import { Segment, Form, Button, Header, Grid } from "semantic-ui-react";
import {
  createEvent,
  updateEvent,
  onCancelClick,
} from "../../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { reduxForm, Field } from "redux-form";
import TextInput from "../form/TextInput";
import TextArea from "../form/TextArea";
import SelectInput from "../form/SelectInput";
import cuid from "cuid";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

export class EventForm extends Component {
  onSubmit = (formValues) => {
    if (formValues.id) {
      this.props.updateEvent(formValues);
      this.props.history.push(`/events/${formValues.id}`);
    } else {
      const id = cuid();
      const hostPhotoURL = "/assets/user.png";
      const hostedBy = "Kevoh";
      const fullUser = { id, hostPhotoURL, hostedBy, ...formValues };
      this.props.createEvent(fullUser);
      this.props.history.push(`/events/${id}`);
    }
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field
                name="title"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                placeholder="What is your event about?"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                component={TextInput}
                placeholder="Event City"
              />
              <Field
                name="venue"
                component={TextInput}
                placeholder="Event Venue"
              />
              <Field
                name="date"
                component={TextInput}
                placeholder="Event Date"
                type="date"
              />

              <Button positive type="submit">
                Submit
              </Button>
              <Button
                type="button"
                onClick={() => {
                  this.props.onCancelClick();
                  this.props.history.push("/events");
                }}
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  let event = state.eventsReducer.selectedEvent;
  return {
    initialValues: event,
  };
};
const formWrapper = reduxForm({
  form: "EventForm",
})(EventForm);

export default withRouter(
  connect(mapStateToProps, {
    createEvent,
    updateEvent,
    onCancelClick,
  })(formWrapper)
);
