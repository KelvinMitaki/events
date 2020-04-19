import React, { Component } from "react";
import EventListItem from "./EventListItem";

export class EventList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.events.map((event) => (
          <EventListItem
            event={event}
            key={event.id}
            viewSelectedEvent={this.props.viewSelectedEvent}
            deleteSelectedEvent={this.props.deleteSelectedEvent}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default EventList;
