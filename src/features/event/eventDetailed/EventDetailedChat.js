import React from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";

const EventDetailedChat = ({ match, comments }) => {
  const tryFixDate = (date) => {
    return formatDistance(date, Date.now());
  };
  return (
    <React.Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.date}>
                <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{tryFixDate(comment.date)} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text} </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}

          <EventDetailedChatForm eventId={match.params.id} />
        </Comment.Group>
      </Segment>
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => {
  let comments;
  if (state.firebase.ordered.event_chat) {
    comments = state.firebase.ordered.event_chat[ownProps.match.params.id].map(
      (comment) => comment.value
    );
  }
  return {
    comments: comments,
  };
};
export default withRouter(connect(mapStateToProps)(EventDetailedChat));
