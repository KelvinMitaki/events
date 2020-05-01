import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../menus/SignedInMenu";
import SignedOutMenu from "../menus/SignedOutMenu";
import { createEventNavbar, openModal } from "../../../redux/actions";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";

export class NavBar extends Component {
  onSignInClick = () => this.props.openModal("LoginModal");
  onRegisterClick = () => this.props.openModal("RegisterModal");
  onSignOutClick = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    const { createEventNavbar, displayName, photoURL, avatarUrl } = this.props;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" exact header>
            <img src="/assets/logo.png" alt="logo" />
            events
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" exact name="Events" />
          {this.props.authenticated.isLoaded &&
            !this.props.authenticated.isEmpty && (
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
          {this.props.authenticated.isLoaded &&
          !this.props.authenticated.isEmpty ? (
            <SignedInMenu
              email={this.props.authenticated.email}
              onSignOutClick={this.onSignOutClick}
              displayName={displayName}
              photoURL={photoURL}
              avatarUrl={avatarUrl}
            />
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
const mapStateToProps = (state) => {
  return {
    authenticated: state.firebase.auth,
    displayName: state.firebase.profile.displayName,
    photoURL: state.firebase.profile.photoURL,
    avatarUrl: state.firebase.profile.avatarUrl,
  };
};
export default withRouter(
  withFirebase(
    connect(mapStateToProps, { createEventNavbar, openModal })(NavBar)
  )
);
