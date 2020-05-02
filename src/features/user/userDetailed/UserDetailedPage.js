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
  Segment,
  Tab,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import LazyLoad from "react-lazyload";
import Spinner from "../../Spinner/Spinner";
import {
  getUserEvents,
  followUser,
  unFollowUser,
} from "../../../redux/actions";
import NotFound from "../../../app/layout/NotFound";

const panes = [
  { menuItem: "All Events", pane: { key: "allEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

class UserDetailedPage extends Component {
  async componentDidMount() {
    await this.props.getUserEvents(this.props.match.params.id);
  }
  setCurrentDate = (joined) => {
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
        {`${day} ${month} ${year} ${hour}:${minutes}`}
      </React.Fragment>
    );
  };

  render() {
    const {
      user,
      photos,
      auth,
      requesting,
      userEvents,
      eventsLoading,
      followUser,
      following,
      unFollowUser,
    } = this.props;
    const loading = Object.values(requesting).some((req) => req === true);
    if (loading) return <Spinner />;
    if (user) {
      const currentmilliSeconds =
        new Date().getTime() - Date.parse(user.dateOfBirth);
      const years = Math.floor(currentmilliSeconds / 31536000000);
      const joined = user.createdAt.toDate();
      const checkFollowing = following.find(
        (follower) => follower.id === this.props.match.params.id
      );
      let button;
      if (auth.uid === user.id) {
        button = (
          <Button
            color="teal"
            fluid
            basic
            as={Link}
            to="/settings"
            content="Edit Profile"
          />
        );
      } else if (!checkFollowing) {
        button = (
          <Button
            onClick={async () => await followUser(user)}
            color="teal"
            fluid
            basic
            content="Follow"
          />
        );
      } else {
        button = (
          <Button
            onClick={async () => await unFollowUser(user)}
            color="red"
            fluid
            basic
            content="unfollow"
          />
        );
      }

      return (
        <React.Fragment>
          <Grid stackable>
            <Grid.Column width={16}>
              <Segment>
                <Item.Group>
                  <Item>
                    <LazyLoad
                      avatar
                      size="small"
                      placeholder={<Item.Image src="/assets/user.png" />}
                    >
                      <Item.Image
                        avatar
                        size="small"
                        src={user.photoURL || user.avatarUrl}
                      />
                    </LazyLoad>
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
                      <strong> {this.setCurrentDate(joined)}</strong>
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
              <Segment>{button}</Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment attached>
                <Header icon="image" content="Photos" />

                <Image.Group size="small">
                  {photos &&
                    photos.map((photo) => (
                      <LazyLoad
                        key={photo.id}
                        placeholder={<Image src="/assets/user.png" />}
                      >
                        <Image src={photo.url} />
                      </LazyLoad>
                    ))}
                </Image.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment attached loading={eventsLoading}>
                <Header icon="calendar" content="Events" />
                <Tab
                  onTabChange={(e, data) =>
                    this.props.getUserEvents(
                      this.props.match.params.id,
                      data.activeIndex
                    )
                  }
                  panes={panes}
                  menu={{ secondary: true, pointing: true }}
                />
                <br />

                <Card.Group itemsPerRow={5}>
                  {userEvents &&
                    userEvents.map((event) => {
                      const eventDate = new Date(event.date.seconds * 1000);

                      return (
                        <Card
                          as={Link}
                          to={`/events/${event.id}`}
                          key={event.id}
                        >
                          <Image
                            src={`/assets/categoryImages/${event.category}.jpg`}
                          />
                          <Card.Content>
                            <Card.Header textAlign="center">
                              {event.title}
                            </Card.Header>
                            <Card.Meta textAlign="center">
                              {this.setCurrentDate(eventDate)}
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      );
                    })}
                </Card.Group>
              </Segment>
            </Grid.Column>
          </Grid>
        </React.Fragment>
      );
    } else {
      return <NotFound />;
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
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following,
    eventsLoading: state.eventsReducer.loading,
    userEvents: state.eventsReducer.userEvents,
  };
};
export default withRouter(
  connect(mapStateToProps, { getUserEvents, followUser, unFollowUser })(
    firestoreConnect(({ match, auth }) => {
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
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "followers" }],
          storeAs: "followers",
        },
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "following" }],
          storeAs: "following",
        },
      ];
    })(UserDetailedPage)
  )
);
