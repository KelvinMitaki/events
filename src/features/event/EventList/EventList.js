import React, { Component } from "react";
import EventListItem from "./EventListItem";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

export class EventList extends Component {
  render() {
    const { events, getNextEvents, loading, moreEvents } = this.props;
    return (
      <React.Fragment>
        {events && events.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {events &&
              events.map((event) => {
                return <EventListItem event={event} key={event.id} />;
              })}
          </InfiniteScroll>
        )}
      </React.Fragment>
    );
  }
}

export default connect(null)(EventList);
