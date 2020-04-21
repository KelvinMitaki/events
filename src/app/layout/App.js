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
import { Route, Switch, withRouter } from "react-router";
import { changeOpenState } from "../../redux/actions";
import { connect } from "react-redux";

export class App extends Component {
  componentDidMount() {
    this.props.changeOpenState();
  }
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
                <Switch key={this.props.location.key}>
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
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={EventForm}
                  />
                </Switch>
              </Container>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(null, { changeOpenState })(App));
