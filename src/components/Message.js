import React from "react";

// This component displays an individual message.
// We should have logic to display it on the right if the user sent the
// message, or on the left if it was received from someone else.
class Message extends React.Component {
  renderTimeStamp() {
    return <div className="time-stamp">{this.props.timeStamp}</div>;
  }
  render() {
    // Display the message text and sender's name

    //Log the props
    console.log(this.props);
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? "from-me" : "";
    return (
      <div className={`message ${fromMe}`}>
        <div className="username">{this.props.username}</div>
        <div className="message-body">{this.props.message}</div>
        <br />
        {}
        {!this.props.fromMe ? this.renderTimeStamp() : ""}
      </div>
    );
  }
}

Message.defaultProps = {};

export default Message;
