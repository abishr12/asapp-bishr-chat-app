require("../styles/App.css");
require("../styles/Login.css");

import React from "react";
import ChatApp from "./ChatApp";

// This is the first screen seen by the user. We should display some way for
// them to enter their name and enter the chat room
class App extends React.Component {
  constructor(props) {
    super(props); // set the initial state of the application
    this.state = { username: "" }; // bind the ‘this’ keyword to the event handlers
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }
  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }
  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username.trim() });
  }
  render() {
    if (this.state.submitted) {
      // Form was submitted, now show the Chat App
      return <ChatApp username={this.state.username} />;
    }
    return (
      // Username Form
      <form
        onSubmit={this.usernameSubmitHandler}
        className="username-container"
      >
        <h1>ASAPP Chat</h1>
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="Enter a username..."
            required
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
App.defaultProps = {};

export default App;
