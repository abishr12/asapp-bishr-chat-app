require("../styles/ChatApp.css");

import React from "react";
import io from "socket.io-client";
import config from "../config";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

// This is where the main logic of the app will be. Here is where we will
// communicate with the chat server (send and receive messages). We will
// then pass the data received from the server to other components to be
// displayed
class ChatApp extends React.Component {
  constructor(props) {
    super(props);

    // set the initial state of messages so that it is not undefined on load
    // set initial state of anotherTyping (another user that is typing) as null
    // to prevent the typing icon from rendering
    this.state = { messages: [], anotherTyping: null };
    // Connect to the server
    this.socket = io(config.api).connect();

    this.sendHandler = this.sendHandler.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.removeRender = this.removeRender.bind(this);

    // Listen for messages from the server
    this.socket.on("server:message", message => {
      this.addMessage(message);
    });

    //Listen for typing from the server (other users)
    this.socket.on("server:typing", message => {
      this.userTyping(message);
    });
  }

  componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementById("messageList");
    objDiv.scrollTop = objDiv.scrollHeight;

    //Reset typingIndicator to disappear when the user completes typing
    if (this.state.anotherTyping) {
      setTimeout(() => {
        this.setState({
          anotherTyping: false
        });
      }, 2000);
    }
  }

  //Uses keystrokes to send message to API that the user is typing
  keyHandler() {
    //Denotes name of user that is typing when the input is in use
    let userTyping = `${this.props.username}`;
    console.log(userTyping);
    const messageObject = { message: userTyping };
    this.socket.emit("client:typing", messageObject);
  }

  //Find out which user is typing (taking in information from the server)
  userTyping(message) {
    // console.log("Typing...");
    // this.setState({ userTyping: message });
    this.setState({ anotherTyping: true }, function() {
      this.setState({ userTyping: message });
    });
  }

  removeRender() {
    setTimeout(this.setState({ userTyping: false }), 2000);
  }
  sendHandler(message, timeStamp) {
    const messageObject = {
      username: this.props.username,
      message,
      timeStamp
    };

    // Emit the message to the server
    this.socket.emit("client:message", messageObject);

    //Verify that message is from the user
    messageObject.fromMe = true;

    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state

    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }
  render() {
    return (
      <div className="container">
        <h3>{this.props.username} Chat</h3>
        <Messages messages={this.state.messages} />

        {this.state.anotherTyping ? (
          // Original version would have  "Adham is typing"
          // But I really like how Apple produces an icon
          // <p>{this.state.userTyping} is typing...</p>
          <TypingIndicator />
        ) : (
          ""
        )}
        <ChatInput onSend={this.sendHandler} onKeyUp={this.keyHandler} />
      </div>
    );
  }
}

ChatApp.defaultProps = {
  username: "Anonymous"
};
export default ChatApp;
