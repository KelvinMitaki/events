import React, { Component, createRef } from "react";
import EventList from "../EventList/EventList";

import { Grid, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createEventButton,
  getEventsForDashboard,
} from "../../../redux/actions";
import EventActivity from "../EventActivity/EventActivity";
import Spinner from "../../Spinner/Spinner";
import { firestoreConnect } from "react-redux-firebase";

export class EventDashboard extends Component {
  createContextRef = createRef();
  state = {
    moreEvents: false,
    initialLoading: true,
    loadedEvents: [],
  };
  async componentDidMount() {
    const querySnapshot = await this.props.getEventsForDashboard();
    if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length > 1) {
      this.setState({ moreEvents: true, initialLoading: false });
    }
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events],
      });
    }
  };
  getNextEvents = async () => {
    const { events } = this.props;
    const lastEvent = events && events[events.length - 1];
    const querySnapshot = await this.props.getEventsForDashboard(lastEvent);
    if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length <= 1) {
      this.setState({ moreEvents: false });
    }
  };
  render() {
    const { loading, activity } = this.props;

    const { loadedEvents, moreEvents } = this.state;
    if (this.state.initialLoading) return <Spinner />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.createContextRef}>
            <EventList
              events={loadedEvents}
              getNextEvents={this.getNextEvents}
              loading={loading}
              moreEvents={moreEvents}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          {activity && (
            <EventActivity
              createContextRef={this.createContextRef}
              activities={activity}
            />
          )}
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.eventsReducer.loading,
    events: state.eventsReducer.events,
    activity: state.firestore.ordered.activity,
  };
};
export default connect(mapStateToProps, {
  createEventButton,
  getEventsForDashboard,
})(
  firestoreConnect([
    { collection: "activity", orderBy: ["timestamp", "desc"], limit: 5 },
  ])(EventDashboard)
);
