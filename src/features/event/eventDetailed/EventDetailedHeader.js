import React from "react";
import { Segment, Image, Header, Item, Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  manageEvent,
  goingToEvent,
  cancelGoingToEvent,
  openModal,
} from "../../../redux/actions";
import { Link } from "react-router-dom";

const eventImageStyle = {
  filter: "brightness(30%)",
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const EventDetailedHeader = ({
  manageEvent,
  history,
  singleEvent,
  uid,
  goingToEvent,
  cancelGoingToEvent,
  authenticated,
  openModal,
}) => {
  if (singleEvent) {
    return singleEvent.map((event) => {
      const test = new Date(event.date.toDate());
      const arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const year = test.getFullYear();
      const month = arr[test.getMonth()];

      const day = test.getDate();
      const hour = test.getHours();

      let minutes = test.getMinutes();
      minutes = minutes === 0 ? "00" : minutes;
      const newUser = Object.keys(event.attendees).map((key) => {
        return {
          id: key,
          ...event.attendees[key],
        };
      });
      const isGoing = newUser.some((u) => u.id === uid);
      let eventCheck;

      if (!isGoing && authenticated && !event.cancelled) {
        eventCheck = (
          <Button onClick={() => goingToEvent(event)} color="teal">
            JOIN THIS EVENT
          </Button>
        );
      } else if (!isGoing && authenticated && event.cancelled) {
        eventCheck = (
          <Label
            size="large"
            color="red"
            content="This event has been cancelled"
          />
        );
      } else if (!authenticated && !event.cancelled) {
        eventCheck = (
          <Button onClick={() => openModal("UnAuthModal")} color="teal">
            JOIN THIS EVENT
          </Button>
        );
      } else if (!authenticated && event.cancelled) {
        eventCheck = (
          <Label
            size="large"
            color="red"
            content="This event has been cancelled"
          />
        );
      }

      return (
        <Segment.Group key={event}>
          <Segment basic attached="top" style={{ padding: "0" }}>
            <Image
              src={`/assets/categoryImages/${event.category}.jpg`}
              fluid
              style={eventImageStyle}
            />

            <Segment basic style={eventImageTextStyle}>
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Header
                      size="huge"
                      content={event.title}
                      style={{ color: "white" }}
                    />
                    <p> {`${day} ${month} ${year} ${hour}:${minutes}`}</p>
                    <p>
                      Hosted by{" "}
                      <strong>
                        <Link
                          to={`/profile/${event.hostUid}`}
                          style={{ color: "white" }}
                        >
                          {event.hostedBy}
                        </Link>
                      </strong>
                    </p>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Segment>
          <Segment attached="bottom" clearing>
            {uid !== event.hostUid && (
              <React.Fragment>
                {isGoing && (
                  <Button onClick={() => cancelGoingToEvent(event)}>
                    Cancel My Place
                  </Button>
                )}
                {eventCheck}
              </React.Fragment>
            )}
            {uid === event.hostUid && (
              <Button
                color="orange"
                floated="right"
                onClick={() => {
                  manageEvent(event);
                  history.push(`/manage/${event.id}`);
                }}
              >
                Manage Event
              </Button>
            )}
          </Segment>
        </Segment.Group>
      );
    });
  } else {
    return null;
  }
};
const mapStateToProps = (state) => {
  return {
    singleEvent: state.firestore.ordered.singleEvent,
    uid: state.firebase.auth.uid,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    manageEvent,
    goingToEvent,
    cancelGoingToEvent,
    openModal,
  })(EventDetailedHeader)
);
