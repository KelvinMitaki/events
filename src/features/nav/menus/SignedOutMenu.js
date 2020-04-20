import React from "react";
import { Menu, Button } from "semantic-ui-react";

const SignedOutMenu = ({ onSIgnInClick }) => {
  return (
    <Menu.Item position="right">
      <Button basic inverted content="Sign In" onClick={onSIgnInClick} />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
};

export default SignedOutMenu;
