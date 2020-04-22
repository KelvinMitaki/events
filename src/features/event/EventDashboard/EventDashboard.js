import React, { Component } from "react";
import EventList from "../EventList/EventList";

import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEventButton } from "../../../redux/actions";

export class EventDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(null, { createEventButton })(EventDashboard);
