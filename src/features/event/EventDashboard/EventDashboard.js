import React, { Component } from "react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";

import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEventButton } from "../../../redux/actions";

export class EventDashboard extends Component {
  render() {
    const { isOpen, selectedEvent, createEventButton } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            disabled={isOpen ? true : false}
            positive
            content="Create Event"
            onClick={() => createEventButton()}
          />
          {isOpen ? (
            <EventForm key={selectedEvent ? selectedEvent.id : 0} />
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.eventsReducer.isOpen,
    selectedEvent: state.eventsReducer.selectedEvent,
  };
};

export default connect(mapStateToProps, { createEventButton })(EventDashboard);
