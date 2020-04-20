import React, { Component } from "react";
import EventListItem from "./EventListItem";
import { connect } from "react-redux";

export class EventList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.events.map((event) => (
          <EventListItem event={event} key={event.id} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.eventsReducer.events,
  };
};

export default connect(mapStateToProps)(EventList);
