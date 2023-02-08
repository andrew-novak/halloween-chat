import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Typography, TextField, Button } from "@mui/material";
import { connect } from "react-redux";

import { API_URL } from "constants/urls";
import setSocket from "actions/setSocket";
import addMessage from "actions/addMessage";
import sendMessage from "actions/sendMessage";
import Screen from "components/Screen";

const ChatScreen = ({
  username,
  socket,
  messages,
  setSocket,
  addMessage,
  sendMessage,
}) => {
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const socket = io.connect(API_URL);

    socket.on("connect", () => {
      console.log("connected");
      setSocket(socket);
    });
    socket.on("disconnect", () => {
      setSocket(null);
    });
    socket.on("chat message", (message) => {
      addMessage(message);
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to err:`, err);
    });
    return () => socket.disconnect();
  }, []);

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
      <div
        style={{
          backgroundColor: "lightblue",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
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
        <Button onClick={() => sendMessage(socket, username, messageInput)}>
          Send
        </Button>
      </div>
    </Screen>
  );
};

const mapState = (state) => {
  const { username, socket, messages } = state.chat;
  return { username, socket, messages };
};

export default connect(mapState, { setSocket, addMessage, sendMessage })(
  ChatScreen
);
