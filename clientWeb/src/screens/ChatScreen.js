import { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { connect } from "react-redux";

import connectToSocket from "actions/connectToSocket";
import sendMessage from "actions/sendMessage";
import Screen from "components/Screen";

const ChatScreen = ({
  username,
  socket,
  messages,
  connectToSocket,
  sendMessage,
}) => {
  const [messageInput, setMessageInput] = useState("");
  useEffect(() => connectToSocket(), []);
  return (
    <Screen>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Live Public Chat</Typography>
        <div>
          <Typography>{username}</Typography>
          <Button>Reset Username</Button>
        </div>
      </div>
      <div style={{ backgroundColor: "lightblue", display: "flex", flex: 1 }}>
        {messages.map(({ author, content }, index) => (
          <Typography key={index}>
            {author}: {content}
          </Typography>
        ))}
      </div>
      <div>
        <TextField
          label="Text..."
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
        />
        <Button onClick={() => sendMessage(socket, messageInput)}>Send</Button>
      </div>
    </Screen>
  );
};

const mapState = (state) => {
  const { username, socket, messages } = state.chat;
  return { username, socket, messages };
};

export default connect(mapState, { connectToSocket, sendMessage })(ChatScreen);
