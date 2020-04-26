import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const EventDetailedSidebar = ({ event, singleEvent }) => {
  if (singleEvent) {
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
          {singleEvent.attendees && Object.values(singleEvent.attendees).length}{" "}
          {singleEvent.attendees &&
          Object.values(singleEvent.attendees).length > 1
            ? "people"
            : "person"}{" "}
          going
        </Segment>
        <Segment attached>
          <Item.Group divided>
            {singleEvent.attendees &&
              Object.values(singleEvent.attendees).map((attendee) => {
                return (
                  <Item
                    key={attendee.displayName}
                    style={{ position: "relative" }}
                  >
                    {attendee.host && (
                      <Label
                        style={{ position: "absolute" }}
                        color="orange"
                        ribbon="right"
                      >
                        Host
                      </Label>
                    )}
                    <Item.Image size="tiny" src={attendee.photoURL} />
                    <Item.Content verticalAlign="middle">
                      <Item.Header as="h3">{attendee.displayName} </Item.Header>
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
const mapStateToProps = (state) => {
  return {
    singleEvent: state.firestore.data.singleEvent,
  };
};
export default withRouter(connect(mapStateToProps)(EventDetailedSidebar));
