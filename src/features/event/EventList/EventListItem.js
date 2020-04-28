import React, { Component } from "react";
import EventListAttendee from "./EventListAttendee";

import { Segment, Item, List, Button, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteEvent } from "../../../redux/actions";
import { Link } from "react-router-dom";

export class EventListItem extends Component {
  render() {
    const { event } = this.props;

    const newAttendees = Object.keys(event.attendees).map((key) => {
      return {
        id: key,
        ...event.attendees[key],
      };
    });

    const test = event.date.toDate();
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

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/events/${event.id}`}>
                  {" "}
                  {event.title}
                </Item.Header>
                <Item.Description>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/profile/${event.hostUid}`}>
                      {event.hostedBy}
                    </Link>
                  </strong>
                </Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: "-40px" }}
                    ribbon="right"
                    color="red"
                    content="This event has been cancelled"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {`${day} ${month} ${year} ${hour}:${minutes}`} |
            <Icon name="marker" /> time
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees
              ? newAttendees.map((attendee) => (
                  <EventListAttendee key={attendee.id} attendee={attendee} />
                ))
              : null}
          </List>
        </Segment>
        <Segment clearing>
          <p>{event.description}</p>

          <Button
            as={Link}
            to={`/events/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default connect(null, { deleteEvent })(EventListItem);
