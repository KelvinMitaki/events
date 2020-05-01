import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const EventDetailedSidebar = ({ singleEvent }) => {
  const test =
    singleEvent &&
    singleEvent.attendees &&
    Object.values(singleEvent.attendees).map((attendee) => attendee);
  const host = test && test.find((attendee) => attendee.host);
  const noHost = test && test.filter((attendee) => !attendee.host);
  const newAttendees = host && test && [host, ...noHost];

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
            {newAttendees &&
              newAttendees.map((attendee) => {
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
                      <Item.Header as="h3">
                        <Link to={`/profile/${singleEvent.hostUid}`}>
                          {attendee.displayName}{" "}
                        </Link>
                      </Item.Header>
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
