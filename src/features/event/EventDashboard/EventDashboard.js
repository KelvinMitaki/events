import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const eventsFromDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },
];

export class EventDashboard extends Component {
  state = {
    events: eventsFromDashboard,
    isOpen: false,
    selectedEvent: null,
  };
  onCancelClick = () => {
    this.setState({ isOpen: false });
  };
  createEventOnSubmit = (user) => {
    const id = cuid();
    const hostPhotoURL = "/assets/user.png";
    const fullUser = { id, ...user, hostPhotoURL };
    this.setState(({ events }) => ({
      events: [fullUser, ...events],
      isOpen: false,
    }));
  };
  viewSelectedEvent = (event) => {
    this.setState({ selectedEvent: event, isOpen: true });
  };
  deleteSelectedEvent = (id) => {
    this.setState({
      events: this.state.events.filter((event) => event.id !== id),
    });
  };
  updateSelectedEvent = (eventReceived) => {
    this.setState(({ events }) => {
      return {
        events: events.map((event) => {
          if (event.id === eventReceived.id) {
            return { ...eventReceived };
          } else {
            return event;
          }
        }),
      };
    });
  };
  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            viewSelectedEvent={this.viewSelectedEvent}
            deleteSelectedEvent={this.deleteSelectedEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            disabled={isOpen ? true : false}
            positive
            content="Create Event"
            onClick={() => this.setState({ isOpen: true, selectedEvent: null })}
          />
          {isOpen ? (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              onCancelClick={this.onCancelClick}
              selectedEvent={this.state.selectedEvent}
              createEventOnSubmit={this.createEventOnSubmit}
              updateSelectedEvent={this.updateSelectedEvent}
            />
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
