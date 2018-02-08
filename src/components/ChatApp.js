require("../styles/ChatApp.css");

import React from "react";
import io from "socket.io-client";
import config from "../config";
import { Grid, Row, Col } from "react-bootstrap";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import moment from "moment";

// This is where the main logic of the app will be. Here is where we will
// communicate with the chat server (send and receive messages). We will
// then pass the data received from the server to other components to be
// displayed
class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    const self = this;
    // set the initial state of messages so that it is not undefined on load
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

    //Listen for typing from the server
    this.socket.on("server:typing", message => {
      this.userTyping(message);
    });
  }

  componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementById("messageList");
    objDiv.scrollTop = objDiv.scrollHeight;

    //Reset rendering to disappear when the user completes typing
    if (this.state.anotherTyping) {
      setTimeout(() => {
        this.setState({
          anotherTyping: false
        });
      }, 2000);
    }
  }
  keyHandler() {
    //Denotes name of user that is typing
    let userTyping = `${this.props.username}`;
    console.log(userTyping);
    const messageObject = { message: userTyping };
    this.socket.emit("client:typing", messageObject);
  }
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
    // Grab the time
    // console.log(message);
    // console.log(timeStamp);
    const messageObject = {
      username: this.props.username,
      message,
      timeStamp
    };
    // console.log(this);
    // Emit the message to the server
    this.socket.emit("client:message", messageObject);

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
