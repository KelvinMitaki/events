import React from "react";
import { Grid } from "semantic-ui-react";
import EventActivity from "../EventActivity/EventActivity";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const Activity = ({ activity }) => {
  return (
    <Grid.Column width={6}>
      {activity && <EventActivity activities={activity} />}
    </Grid.Column>
  );
};
const mapStateToProps = (state) => {
  return {
    activity: state.firestore.ordered.activity,
  };
};
export default connect(mapStateToProps)(
  firestoreConnect([
    { collection: "activity", orderBy: ["timestamp", "desc"], limit: 5 },
  ])(Activity)
);
