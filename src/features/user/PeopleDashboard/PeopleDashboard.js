import React from "react";
import { Grid, Segment, Header, Card } from "semantic-ui-react";
import PersonCard from "./PersonCard";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const PeopleDashboard = ({ followers, following }) => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="People following me" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followers.length > 0 &&
              followers.map((follower) => (
                <PersonCard key={follower.id} user={follower} />
              ))}
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People I'm following" />
          <Card.Group itemsPerRow={8} stackable>
            {following &&
              following.length > 0 &&
              following.map((follower) => (
                <PersonCard key={follower.id} user={follower} />
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    followers: state.firestore.ordered.followers,
    following: state.firestore.ordered.following,
  };
};
export default connect(mapStateToProps)(
  firestoreConnect(({ auth }) => [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "followers" }],
      storeAs: "followers",
    },
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "following" }],
      storeAs: "following",
    },
  ])(PeopleDashboard)
);
