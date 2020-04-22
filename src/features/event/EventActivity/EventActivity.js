import React from "react";
import { Header, Segment } from "semantic-ui-react";

const EventActivity = () => {
  return (
    <React.Fragment>
      <Header attached="top" content="Recent Activity" />
      <Segment attached>
        <p>Recent Activity</p>
      </Segment>
    </React.Fragment>
  );
};

export default EventActivity;
