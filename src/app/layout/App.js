import React, { Component } from "react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container className="overlap">
          <EventDashboard />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
