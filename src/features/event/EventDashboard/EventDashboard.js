import React, { Component } from "react";
import EventList from "../EventList/EventList";

import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEventButton } from "../../../redux/actions";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../../Spinner/Spinner";

export class EventDashboard extends Component {
  render() {
    const { requesting } = this.props;
    const loading = Object.values(requesting).some((req) => req === true);
    if (loading) return <Spinner />;
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
const mapStateToProps = (state) => {
  return {
    requesting: state.firestore.status.requesting,
  };
};
export default connect(mapStateToProps, { createEventButton })(
  firestoreConnect([{ collection: "events" }])(EventDashboard)
);
