import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Form, Button } from "semantic-ui-react";
import TextArea from "../form/TextArea";
import { connect } from "react-redux";
import { addEventComment } from "../../../redux/actions";

class EventDetailedChatForm extends Component {
  handleCommentSubmit = (formValues) => {
    const {
      eventId,
      reset,
      addEventComment,
      handleCloseReplyForm,
      parentId,
    } = this.props;
    addEventComment(eventId, formValues, parentId);
    reset();
    if (parentId !== 0) {
      handleCloseReplyForm();
    }
  };
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button
          loading={this.props.loading}
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.eventsReducer.loading,
  };
};
export default connect(mapStateToProps, { addEventComment })(
  reduxForm({ Fields: "comment" })(EventDetailedChatForm)
);
