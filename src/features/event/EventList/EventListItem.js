import React, { Component } from "react";
import { Segment, Item, List, Button, Icon } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

export class EventListItem extends Component {
  render() {
    const { event, viewSelectedEvent, deleteSelectedEvent } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
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
            onClick={() => deleteSelectedEvent(event.id)}
          />
          <Button
            as="a"
            color="teal"
            floated="right"
            content="View"
            onClick={() => viewSelectedEvent(event)}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
