import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { withRouter } from "react-router";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Spinner from "../../Spinner/Spinner";

const EventDetailedPage = ({ requesting, auth }) => {
  const loading = Object.values(requesting).some((req) => req === true);
  const authenticated = auth.isLoaded && !auth.isEmpty;

  if (loading) return <Spinner />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader authenticated={authenticated} />
        <EventDetailedInfo />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    requesting: state.firestore.status.requesting,
    auth: state.firebase.auth,
  };
};
export default withRouter(
  connect(mapStateToProps)(
    firebaseConnect(({ match }) => [`event_chat/${match.params.id}`])(
      firestoreConnect(({ match }) => [
        { collection: "events", doc: match.params.id, storeAs: "singleEvent" },
      ])(EventDetailedPage)
    )
  )
);
