import TextInput from "../form/TextInput";
import TextArea from "../form/TextArea";
import SelectInput from "../form/SelectInput";
import cuid from "cuid";
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
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import DateInput from "../form/DateInput";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "The category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(19)({
      message: "Description needs to be at least 20 characters",
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date"),
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

export class EventForm extends Component {
  onSubmit = async (event) => {
    if (event.id) {
      this.props.updateEvent(event);
      this.props.history.push(`/events/${event.id}`);
    } else {
      const createdEvent = await this.props.createEvent(event);
      this.props.history.push(`/events/${createdEvent.id}`);
    }
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={14}>
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
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                showTimeSelect
                timeFormat="HH:mm"
                placeholder="Event Date"
              />

              <Button
                disabled={pristine || submitting || invalid}
                positive
                type="submit"
              >
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
  validate,
})(EventForm);

export default withRouter(
  connect(mapStateToProps, {
    createEvent,
    updateEvent,
    onCancelClick,
  })(formWrapper)
);
