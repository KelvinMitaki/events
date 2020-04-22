import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../menus/SignedInMenu";
import SignedOutMenu from "../menus/SignedOutMenu";
import { createEventNavbar, openModal } from "../../../redux/actions";
import { connect } from "react-redux";

export class NavBar extends Component {
  state = {
    authenticated: false,
  };
  onSignInClick = () => this.props.openModal("LoginModal");
  onRegisterClick = () => this.props.openModal("RegisterModal");
  onSignOutClick = () => {
    this.setState({ authenticated: false });
    this.props.history.push("/");
  };
  render() {
    const { createEventNavbar } = this.props;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" exact header>
            <img src="/assets/logo.png" alt="logo" />
            events
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" exact name="Events" />
          {this.state.authenticated && (
            <React.Fragment>
              <Menu.Item as={NavLink} to="/people" name="People" />
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                  onClick={() => createEventNavbar()}
                />
              </Menu.Item>
            </React.Fragment>
          )}
          {this.state.authenticated ? (
            <SignedInMenu onSignOutClick={this.onSignOutClick} />
          ) : (
            <SignedOutMenu
              onSIgnInClick={this.onSignInClick}
              onRegisterClick={this.onRegisterClick}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  connect(null, { createEventNavbar, openModal })(NavBar)
);
