import React from "react";
import SettingsNav from "./SettingsNav";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";

import { Grid } from "semantic-ui-react";
import { Route, Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import PhotosPage from "./photos/PhotosPage";

const SettingsDashboard = ({ user }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect from="/settings" to="/settings/basics" exact />
          <Route
            path="/settings/basics"
            render={() => <BasicPage initialValues={user} />}
          />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route path="/settings/account" component={AccountPage} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.firebase.profile,
  };
};
export default connect(mapStateToProps)(SettingsDashboard);
