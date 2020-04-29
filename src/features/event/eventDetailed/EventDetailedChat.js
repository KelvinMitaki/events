import React from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";

class EventDetailedChat extends React.Component {
  state = {
    replyFormOpen: false,
    commentId: null,
  };
  tryFixDate = (date) => {
    return formatDistance(date, Date.now());
  };
  handleOpenReplyForm = (id) => {
    this.setState({ replyFormOpen: true, commentId: id });
  };
  handleCloseReplyForm = () => {
    this.setState({ replyFormOpen: false, commentId: null });
  };
  //ALGORITHM FOR SORTING EVENTS AND THEIR CHILDREN
  createDataTree = (dataset) => {
    let hashTable = Object.create(null);
    dataset.forEach((a) => (hashTable[a.id] = { ...a, childNodes: [] }));
    let dataTree = [];
    dataset.forEach((a) => {
      if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
      else dataTree.push(hashTable[a.id]);
    });
    return dataTree;
  };
  render() {
    const { match, comments } = this.props;
    const { replyFormOpen, commentId } = this.state;
    const newComments = comments && this.createDataTree(comments);
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
            {newComments &&
              newComments.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || "/assets/user.png"}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{this.tryFixDate(comment.date)} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text} </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={() => this.handleOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {replyFormOpen && commentId === comment.id && (
                        <EventDetailedChatForm
                          handleCloseReplyForm={this.handleCloseReplyForm}
                          eventId={match.params.id}
                          form={`reply_${comment.id}`}
                          parentId={comment.id}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  <Comment.Group>
                    {comment.childNodes &&
                      comment.childNodes.map((child) => (
                        <Comment key={child.id}>
                          <Comment.Avatar
                            src={child.photoURL || "/assets/user.png"}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            >
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>{this.tryFixDate(child.date)} ago</div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text} </Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={() =>
                                  this.handleOpenReplyForm(child.id)
                                }
                              >
                                Reply
                              </Comment.Action>
                              {replyFormOpen && commentId === child.id && (
                                <EventDetailedChatForm
                                  handleCloseReplyForm={
                                    this.handleCloseReplyForm
                                  }
                                  eventId={match.params.id}
                                  form={`reply_${child.id}`}
                                  parentId={child.parentId}
                                />
                              )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      ))}
                  </Comment.Group>
                </Comment>
              ))}
          </Comment.Group>
          <EventDetailedChatForm
            eventId={match.params.id}
            form={`newComment`}
            parentId={0}
          />
        </Segment>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let comments;
  if (
    state.firebase.ordered.event_chat &&
    state.firebase.ordered.event_chat[ownProps.match.params.id]
  ) {
    comments = state.firebase.ordered.event_chat[ownProps.match.params.id].map(
      (comment) => ({
        id: comment.key,
        ...comment.value,
      })
    );
  }
  return {
    comments: comments,
  };
};
export default withRouter(connect(mapStateToProps)(EventDetailedChat));
