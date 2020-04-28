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
    const { user, photos, auth } = this.props;
    if (user) {
      const currentmilliSeconds =
        new Date().getTime() - Date.parse(user.dateOfBirth);
      const years = Math.floor(currentmilliSeconds / 31536000000);
      const joined = user.createdAt.toDate();
      const test = new Date(joined);
      const arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const year = test.getFullYear();
      const month = arr[test.getMonth()];

      const day = test.getDate();
      const hour = test.getHours();

      let minutes = test.getMinutes();
      minutes = minutes === 0 ? "00" : minutes;

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
                      Member Since:{" "}
                      <strong>
                        {" "}
                        {`${day} ${month} ${year} ${hour}:${minutes}`}
                      </strong>
                    </p>
                    <p>
                      Description of the user: <strong>{user.about} </strong>
                    </p>
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
                {auth.uid === user.id ? (
                  <Button
                    color="teal"
                    fluid
                    basic
                    as={Link}
                    to="/settings"
                    content="Edit Profile"
                  />
                ) : (
                  <Button color="teal" fluid basic as={Link} content="Follow" />
                )}
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
  if (state.firestore.ordered.users) {
    if (state.firestore.ordered.users.length > 0) {
      user = state.firestore.ordered.users[0];
    }
  }
  return {
    user: user,
    photos: state.firestore.ordered.photos,
    auth: state.firebase.auth,
  };
};
export default withRouter(
  connect(mapStateToProps)(
    firestoreConnect(({ match }) => {
      return [
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
      ];
    })(UserDetailedPage)
  )
);
