import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SignedInMenu = ({
  onSignOutClick,
  photoURL,
  avatarUrl,
  displayName,
  uid,
}) => {
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={`${photoURL || avatarUrl || "/assets/user.png"}`}
      />
      <Dropdown pointing="top left" text={displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item
            as={Link}
            to={`/profile/${uid}`}
            text="My Profile"
            icon="user"
          />
          <Dropdown.Item
            text="Settings"
            icon="settings"
            as={Link}
            to="/settings"
          />
          <Dropdown.Item
            text="Sign Out"
            icon="power"
            onClick={onSignOutClick}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
  };
};
export default connect(mapStateToProps)(SignedInMenu);
