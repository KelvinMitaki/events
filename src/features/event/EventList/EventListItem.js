import React, { Component } from "react";
import EventListAttendee from "./EventListAttendee";

import { Segment, Item, List, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteEvent } from "../../../redux/actions";
import { Link } from "react-router-dom";

export class EventListItem extends Component {
  render() {
    const { event, deleteEvent } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <strong>{event.hostedBy}</strong>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {event.date} |
            <Icon name="marker" /> time
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees
              ? event.attendees.map((attendee) => (
                  <EventListAttendee key={attendee.id} attendee={attendee} />
                ))
              : null}
          </List>
        </Segment>
        <Segment clearing>
          <p>{event.description}</p>
          <Button
            as="a"
            color="red"
            floated="right"
            content="Delete"
            onClick={() => deleteEvent(event.id)}
          />
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
