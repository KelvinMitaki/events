import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../menus/SignedInMenu";
import SignedOutMenu from "../menus/SignedOutMenu";

export class NavBar extends Component {
  state = {
    authenticated: false,
  };
  onSignInClick = () => this.setState({ authenticated: true });
  onSignOutClick = () => {
    this.setState({ authenticated: false });
    this.props.history.push("/");
  };
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" exact header>
            <img src="/assets/logo.png" alt="logo" />
            events
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="People" />
          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              positive
              inverted
              content="Create Event"
            />
          </Menu.Item>
          {this.state.authenticated ? (
            <SignedInMenu onSignOutClick={this.onSignOutClick} />
          ) : (
            <SignedOutMenu onSIgnInClick={this.onSignInClick} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
