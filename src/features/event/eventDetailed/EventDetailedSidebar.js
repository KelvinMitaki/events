import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const EventDetailedSidebar = ({ event }) => {
  if (event.attendees) {
    return (
      <Fragment>
        <Segment
          textAlign="center"
          style={{ border: "none" }}
          attached="top"
          secondary
          inverted
          color="teal"
        >
          {event.attendees && event.attendees.length}{" "}
          {event.attendees && event.attendees.length > 1 ? "people" : "person"}{" "}
          going
        </Segment>
        <Segment attached>
          <Item.Group divided>
            {event.attendees &&
              event.attendees.map((attendee) => {
                return (
                  <Item key={attendee.id} style={{ position: "relative" }}>
                    <Label
                      style={{ position: "absolute" }}
                      color="orange"
                      ribbon="right"
                    >
                      Host
                    </Label>
                    <Item.Image size="tiny" src={attendee.photoURL} />
                    <Item.Content verticalAlign="middle">
                      <Item.Header as="h3">{attendee.name} </Item.Header>
                    </Item.Content>
                  </Item>
                );
              })}
          </Item.Group>
        </Segment>
      </Fragment>
    );
  } else {
    return null;
  }
};
const mapStateToProps = (state, ownProps) => {
  return {
    event: state.eventsReducer.events.find(
      (event) => event.id === ownProps.match.params.id
    ),
  };
};
export default withRouter(connect(mapStateToProps)(EventDetailedSidebar));
