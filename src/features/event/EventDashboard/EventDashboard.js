import React, { Component } from "react";
import EventList from "../EventList/EventList";

import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEventButton } from "../../../redux/actions";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

export class EventDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(null, { createEventButton })(
  firestoreConnect([{ collection: "events" }])(EventDashboard)
);
