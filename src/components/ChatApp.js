require("../styles/ChatApp.css");

import React from "react";
import io from "socket.io-client";
import config from "../config";
import { Grid, Row, Col } from "react-bootstrap";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import moment from "moment";

// This is where the main logic of the app will be. Here is where we will
// communicate with the chat server (send and receive messages). We will
// then pass the data received from the server to other components to be
// displayed
class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    // set the initial state of messages so that it is not undefined on load
    this.state = { messages: [], typing: false };
    // Connect to the server
    this.socket = io(config.api).connect();
    this.sendHandler = this.sendHandler.bind(this);

    // Listen for messages from the server
    this.socket.on("server:message", message => {
      this.addMessage(message);
    });

    //Listen for typing from the server
    this.socket.on("server:typing", bool => {
      if (true) {
        this.isTyping();
      }
    });
  }

  componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementById("messageList");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  keyHandler(bool) {
    if (true) {
      this.socket.emit("client:typing", true);
    }
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
    // console.log(messageObject);
    // Emit the message to the server
    this.socket.emit("client:message", messageObject);

    messageObject.fromMe = true;

    this.addMessage(messageObject);
  }

  isTyping() {
    //Message to display typing
    console.log("Another User Is Typing");
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
        <h3>Asapp Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} onKeyUp={this.keyHandler} />
      </div>
    );
  }
}

ChatApp.defaultProps = {
  username: "Anonymous"
};
export default ChatApp;
