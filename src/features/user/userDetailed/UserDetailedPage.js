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
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;
    const currentmilliSeconds =
      new Date().getTime() - Date.parse(profile.dateOfBirth);
    const years = Math.floor(currentmilliSeconds / 31536000000);

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={16}>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image avatar size="small" src={profile.photoURL} />
                  <Item.Content verticalAlign="bottom">
                    <Header as="h1">{profile.displayName} </Header>
                    <br />
                    <Header as="h3">{profile.occupation} </Header>
                    <br />
                    <Header as="h3">
                      {!Number.isNaN(years) && years + ","}{" "}
                      {profile.city &&
                        `Lives in 
                      ${profile.city}`}{" "}
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
                  {profile.occupation && (
                    <p>
                      I am a: <strong>{profile.occupation} </strong>
                    </p>
                  )}
                  {profile.origin && (
                    <p>
                      Originally from <strong>{profile.origin} </strong>
                    </p>
                  )}
                  <p>
                    Member Since: <strong>28th March 2018</strong>
                  </p>
                  <strong>{profile.about} </strong>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Header icon="heart outline" content="Interests" />
                  <List>
                    {profile.interests ? (
                      profile.interests.map((interest) => (
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
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(
  firestoreConnect(({ auth }) => [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos",
    },
  ])(UserDetailedPage)
);
