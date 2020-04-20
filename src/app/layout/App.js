import React, { Component } from "react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/event/eventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "../../features/user/userDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";

import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router";

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <React.Fragment>
              <NavBar />
              <Container className="overlap">
                <Switch>
                  <Route exact path="/events" component={EventDashboard} />
                  <Route
                    exact
                    path="/events/:id"
                    component={EventDetailedPage}
                  />
                  <Route exact path="/people" component={PeopleDashboard} />
                  <Route
                    exact
                    path="/profile/:id"
                    component={UserDetailedPage}
                  />
                  <Route exact path="/settings" component={SettingsDashboard} />
                  <Route exact path="/createEvent" component={EventForm} />
                </Switch>
              </Container>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
