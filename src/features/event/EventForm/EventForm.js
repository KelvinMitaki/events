import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import {
  createEvent,
  updateEvent,
  onCancelClick,
} from "../../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

export class EventForm extends Component {
  state = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };
  componentDidMount() {
    if (this.props.selectedEvent) {
      this.setState({ ...this.props.selectedEvent });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
    } else {
      this.props.createEvent(this.state);
    }
    if (this.props.match.url !== "/events") {
      this.props.history.push("/events");
    }
  };

  render() {
    const { title, hostedBy, venue, date, city } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              value={title}
              onChange={this.handleChange}
              name="title"
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type="date"
              value={date}
              onChange={this.handleChange}
              name="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              value={city}
              onChange={this.handleChange}
              name="city"
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              value={venue}
              onChange={this.handleChange}
              name="venue"
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              value={hostedBy}
              onChange={this.handleChange}
              name="hostedBy"
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button
            disabled={
              !venue || !hostedBy || !title || !date || !city ? true : false
            }
            positive
            type="submit"
          >
            Submit
          </Button>
          <Button type="button" onClick={() => this.props.history.goBack()}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedEvent: state.eventsReducer.selectedEvent,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    createEvent,
    updateEvent,
    onCancelClick,
  })(EventForm)
);
