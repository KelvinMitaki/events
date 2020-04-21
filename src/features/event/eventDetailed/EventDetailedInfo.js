import React from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const EventDetailedInfo = ({ event }) => {
  const test = new Date(event.date);
  const arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = test.getFullYear();
  const month = arr[test.getMonth()];

  const day = test.getDate();
  const hour = test.getHours();
  let minutes = test.getMinutes();
  minutes = minutes === 0 ? "00" : minutes;

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description} </p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span> {`${day} ${month} ${year} ${hour}:${minutes}`}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue} </span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color="teal" size="tiny" content="Show Map" />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    event: state.eventsReducer.events.find(
      (event) => event.id === ownProps.match.params.id
    ),
  };
};
export default withRouter(connect(mapStateToProps)(EventDetailedInfo));
