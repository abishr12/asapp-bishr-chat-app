import React from "react";
import Message from "./Message";

// This is the main display of the application. It shows a list of all the
// messages which have been sent and received during the current chat session.
class Messages extends React.Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById("messageList");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          username={message.username}
          message={message.message}
          fromMe={message.fromMe}
          timeStamp={message.timeStamp}
        />
      );
    });

    return (
      <div className="messages" id="messageList">
        {messages}
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
