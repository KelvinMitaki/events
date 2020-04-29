import React, { Component } from "react";
import EventList from "../EventList/EventList";

import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createEventButton,
  getEventsForDashboard,
} from "../../../redux/actions";
import EventActivity from "../EventActivity/EventActivity";
import Spinner from "../../Spinner/Spinner";

export class EventDashboard extends Component {
  state = {
    moreEvents: false,
  };
  async componentDidMount() {
    const querySnapshot = await this.props.getEventsForDashboard();
    if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length > 1) {
      this.setState({ moreEvents: true });
    }
  }
  getNextEvents = async () => {
    const { events } = this.props;
    const lastEvent = events && events[events.length - 1];
    const querySnapshot = await this.props.getEventsForDashboard(lastEvent);
    if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length <= 1) {
      this.setState({ moreEvents: false });
    }
  };
  render() {
    const { loading, events } = this.props;

    if (loading) return <Spinner />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
          <Button
            onClick={this.getNextEvents}
            disabled={!this.state.moreEvents}
            content="More"
            color="green"
          />
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
    loading: state.eventsReducer.loading,
    events: state.eventsReducer.events,
  };
};
export default connect(mapStateToProps, {
  createEventButton,
  getEventsForDashboard,
})(EventDashboard);
