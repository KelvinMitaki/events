import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const EventDetailedSidebar = ({ event }) => {
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
        {event && event.attendees.length}{" "}
        {event && event.attendees.length === 1 ? "person" : "people"} going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {event &&
            event.attendees.map((attendee) => {
              return (
                <Item style={{ position: "relative" }}>
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
};
const mapStateToProps = (state, ownProps) => {
  return {
    event: state.eventsReducer.events[ownProps.match.params.id],
  };
};
export default withRouter(connect(mapStateToProps)(EventDetailedSidebar));
