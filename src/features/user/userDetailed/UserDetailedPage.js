import React, { Component } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

class UserDetailedPage extends Component {
  render() {
    const { user, photos } = this.props;
    if (user) {
      const currentmilliSeconds =
        new Date().getTime() - Date.parse(user.dateOfBirth);
      const years = Math.floor(currentmilliSeconds / 31536000000);

      return (
        <React.Fragment>
          <Grid>
            <Grid.Column width={16}>
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image
                      avatar
                      size="small"
                      src={user.photoURL || user.avatarUrl}
                    />
                    <Item.Content verticalAlign="bottom">
                      <Header as="h1">{user.displayName} </Header>
                      <br />
                      <Header as="h3">{user.occupation} </Header>
                      <br />
                      <Header as="h3">
                        {!Number.isNaN(years) && years + ","}{" "}
                        {user.city &&
                          `Lives in 
                      ${user.city}`}{" "}
                      </Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment>
                <Grid columns={2}>
                  <Grid.Column width={10}>
                    <Header icon="smile" content="About Display Name" />
                    {user.occupation && (
                      <p>
                        I am a: <strong>{user.occupation} </strong>
                      </p>
                    )}
                    {user.origin && (
                      <p>
                        Originally from <strong>{user.origin} </strong>
                      </p>
                    )}
                    <p>
                      Member Since: <strong>28th March 2018</strong>
                    </p>
                    <strong>{user.about} </strong>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Header icon="heart outline" content="Interests" />
                    <List>
                      {user.interests ? (
                        user.interests.map((interest) => (
                          <Item key={Math.random()}>
                            <Icon name="heart" />
                            <Item.Content>{interest} </Item.Content>
                          </Item>
                        ))
                      ) : (
                        <h3>No interests for this user</h3>
                      )}
                    </List>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <Button
                  color="teal"
                  fluid
                  basic
                  as={Link}
                  to="/settings"
                  content="Edit Profile"
                />
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment attached>
                <Header icon="image" content="Photos" />

                <Image.Group size="small">
                  {photos &&
                    photos.map((photo) => (
                      <Image key={photo.id} src={photo.url} />
                    ))}
                </Image.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment attached>
                <Header icon="calendar" content="Events" />
                <Menu secondary pointing>
                  <Menu.Item name="All Events" active />
                  <Menu.Item name="Past Events" />
                  <Menu.Item name="Future Events" />
                  <Menu.Item name="Events Hosted" />
                </Menu>

                <Card.Group itemsPerRow={5}>
                  <Card>
                    <Image src={"/assets/categoryImages/drinks.jpg"} />
                    <Card.Content>
                      <Card.Header textAlign="center">Event Title</Card.Header>
                      <Card.Meta textAlign="center">
                        28th March 2018 at 10:00 PM
                      </Card.Meta>
                    </Card.Content>
                  </Card>

                  <Card>
                    <Image src={"/assets/categoryImages/drinks.jpg"} />
                    <Card.Content>
                      <Card.Header textAlign="center">Event Title</Card.Header>
                      <Card.Meta textAlign="center">
                        28th March 2018 at 10:00 PM
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Segment>
            </Grid.Column>
          </Grid>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  let user;
  if (Object.keys(state.firestore.ordered).length > 0) {
    user = state.firestore.ordered.users[0];
  }
  return {
    user: user,
    photos: state.firestore.ordered.photos,
    auth: state.firebase.auth,
  };
};
export default withRouter(
  connect(mapStateToProps)(
    firestoreConnect(({ match }) => [
      {
        collection: "users",
        doc: match.params.id,
      },
      {
        collection: "users",
        doc: match.params.id,
        subcollections: [{ collection: "photos" }],
        storeAs: "photos",
      },
    ])(UserDetailedPage)
  )
);
