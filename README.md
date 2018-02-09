# ASAPP Chat

## Table of Contents

[Purpose](#purpose)<br />
[Requirements](#requirements)<br />
[Running The Chat App](#running-the-app)<br />
[Using The Chat App](#using-the-chat-app)<br />
[Future Backend Integration](#backend-integration)<br />
[Final Thoughts](#final-thoughts)<br />

## Purpose

Built from the react-instant-chat app with modifications for the purposes of the ASAPP front-end challenge.

This was incredibly fun and I would like to thank you for giving me the opportunity to apply at ASAPP.

![Thank You !!!](https://media.giphy.com/media/yoJC2El7xJkYCadlWE/giphy.gif)

## Requirements

Ensure that you also have the [bishr-chat-api](https://github.com/abishr12/bishr-chat-api) running as well

## Running The Chat App

To start the app, run:

```
npm install

npm start
```

Ensure that you also have the [bishr-chat-api](https://github.com/abishr12/bishr-chat-api) running as well

Once the webpack server has started you can access it in a browser at http://localhost:8000/webpack-dev-server/

## Using The Chat App

### Opening the App

Open the app on two separate browsers

NOTE: I know the requirement had the chat on one tab. However, I felt for testing purposes (and when it would go into production) that the chat would be better served simulating two separate users at two separate locations

![username-input](https://media.giphy.com/media/xUOwGoYWWkpzNPdJ1C/giphy.gif)

### Typing Indication

While typing you'll see the typing indicator (based off of Apple's iMessage) indicating that the other user is typing along with timestamps for incoming messages

![chat-display](https://media.giphy.com/media/l4pTdhjYMM80uJehO/giphy.gif)

## Enjoy Your Chat

![enjoy-your-chat](https://media.giphy.com/media/pSpmpxFxFwDpC/giphy.gif)

## Future Backend Integration

With this kind of application, I do believe MySQL would be the best way to go with two tables (one for users, the other for messages).

Each user would be assigned an id and every message sent would record the id of the sender (and in the future who it was sent to).

The app runs off of using an array to display the messages while differentiating who it is from.

An API would make a GET request with both the user (derived from a login screen) and the chat history of whomever they'd like to talk to, apply it to the empty messages array, and render it onto the screen.

Happy to discuss this further!

## Final Thoughts

Once again thank you for your time. I really enjoyed working on this and hope you were similarly impressed with the app as I am. Looking forward to the next steps.

![cool](https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif)
