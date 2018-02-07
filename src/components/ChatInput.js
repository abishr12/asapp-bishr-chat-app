import React from "react";
import moment from "moment";

// This component is where the user can type their message and send it
// to the chat room. We shouldn't communicate with the server here though.
class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state of the chatInput so that it is not undefined
    this.state = { chatInput: "", timeStamp: "" };
    // React ES6 does not bind 'this' to event handlers by default
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }
  textChangeHandler(event) {
    this.setState({ chatInput: event.target.value });
  }
  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();
    let now = moment();
    let timeNow = now._d.toString();
    const getTime = dateTime => {
      return moment(dateTime).format("HH:mm a"); // 10:30 am
    };

    let timeStamp = getTime(timeNow);
    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput, timeStamp);
    // Clear the input box
    this.setState({ chatInput: "" });
  }
  render() {
    // Display a user input form and do something when it is submitted
    return (
      <form className="chat-input" onSubmit={this.submitHandler}>
        <input
          type="text"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required
        />
      </form>
    );
  }
}

ChatInput.defaultProps = {};

export default ChatInput;
