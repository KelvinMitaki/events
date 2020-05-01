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
import ModalManager from "../../features/modals/ModalManager";
import { UserIsAuthenticated } from "../../features/auth/authWrapper/authWrapper";
import NotFound from "./NotFound";
import Spinner from "../../features/Spinner/Spinner";

export class App extends Component {
  componentDidMount() {
    this.props.changeOpenState();
  }
  render() {
    const { auth } = this.props;
    if (!auth.isLoaded) return <Spinner />;
    return (
      <React.Fragment>
        <ModalManager />
        <Route exact path="/" component={HomePage} />
        {auth.isLoaded && (
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
                      render={() => <EventDetailedPage />}
                    />
                    <Route
                      exact
                      path="/people"
                      component={UserIsAuthenticated(PeopleDashboard)}
                    />
                    <Route
                      exact
                      path="/profile/:id"
                      component={UserIsAuthenticated(UserDetailedPage)}
                    />
                    <Route
                      path="/settings"
                      component={UserIsAuthenticated(SettingsDashboard)}
                    />
                    <Route
                      path={["/createEvent", "/manage/:id"]}
                      component={UserIsAuthenticated(EventForm)}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </React.Fragment>
            )}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default withRouter(connect(mapStateToProps, { changeOpenState })(App));
