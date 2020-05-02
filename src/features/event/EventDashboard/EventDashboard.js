import React, { Component, createRef } from "react";
import EventList from "../EventList/EventList";

import { Grid, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createEventButton,
  getEventsForDashboard,
} from "../../../redux/actions";

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
    const { loading } = this.props;

    const { loadedEvents, moreEvents } = this.state;
    return (
      <Grid stackable>
        <Grid.Column width={15}>
          <div ref={this.createContextRef}>
            <EventList
              events={loadedEvents}
              getNextEvents={this.getNextEvents}
              loading={loading}
              moreEvents={moreEvents}
            />
          </div>
        </Grid.Column>

        <Grid.Column width={15}>
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
  };
};
export default connect(mapStateToProps, {
  createEventButton,
  getEventsForDashboard,
})(EventDashboard);
