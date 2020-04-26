import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { withRouter } from "react-router";
import { firestoreConnect } from "react-redux-firebase";

const EventDetailedPage = ({ events, match }) => {
  const event = events.find((event) => event.id === match.params.id);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat event={event} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar event={event} />
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(
  firestoreConnect(({ match }) => [
    { collection: "events", doc: match.params.id, storeAs: "singleEvent" },
  ])(EventDetailedPage)
);
