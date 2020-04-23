import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { socialLogin } from "../../../redux/actions";

const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <Button
        onClick={() => socialLogin("google")}
        type="button"
        fluid
        color="google plus"
      >
        <Icon name="google plus" />
        Login with Google
      </Button>
    </div>
  );
};

export default connect(null, { socialLogin })(SocialLogin);
