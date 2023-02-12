import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SendIcon from "@mui/icons-material/Send";
import { connect } from "react-redux";

import { API_URL } from "constants/urls";
import setSocket from "actions/setSocket";
import addMessage from "actions/addMessage";
import sendMessage from "actions/sendMessage";
import Screen from "components/Screen";

const NODE_ENV = process.env.NODE_ENV;
const SOCKET_IO_PATH = process.env.REACT_APP_SOCKET_IO_PATH;

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
    const socket = io.connect(API_URL, {
      path: NODE_ENV === "production" && SOCKET_IO_PATH,
    });

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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Screen>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#c87974",
        }}
      >
        <Typography>Live Public Chat</Typography>
        <div>
          <Typography>{username}</Typography>
          <Button>Reset Username</Button>
        </div>
      </div>
      {/* Body */}
      <div
        style={{
          backgroundColor: "#695579",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: 24,
        }}
      >
        {messages.map(({ author, content }, index) => {
          return (
            <div
              style={{
                marginTop: index !== 0 && 8,
                marginBottom:
                  messages[index + 1] &&
                  author !== messages[index + 1].author &&
                  17,
                alignSelf: author === username && "end",
              }}
            >
              {/* Author Username */}
              {/* Do not show  */}
              {author !== username &&
                (index === 0 || author !== messages[index - 1].author) && (
                  <div>
                    <Typography style={{ color: "#231a2a", fontSize: 16 }}>
                      {author}
                    </Typography>
                  </div>
                )}
              {/* Message Content */}
              <div
                style={{
                  backgroundColor: author === username ? "#c87974" : "#45364f",
                  padding: "2px 10px 2px 10px",
                  borderRadius: 5,
                }}
              >
                <Typography
                  key={index}
                  style={{
                    fontSize: 18,
                    color: author === username ? "#231a2a" : "#f2857e",
                  }}
                >
                  {content}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 56, width: "100%" }} />
      <div
        style={{
          position: "fixed",
          height: 40,
          width: "100%",
          bottom: 60,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton variant="contained" onClick={scrollToBottom}>
          <ArrowDownwardIcon />
        </IconButton>
      </div>
      {/* Footer */}
      <div
        style={{
          backgroundColor: "#9C7C84",
          position: "fixed",
          bottom: 0,
          height: 56,
          width: "100%",
          display: "flex",
        }}
      >
        <TextField
          label="Text..."
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          sx={{
            backgroundColor: "#c87974",
            flex: 1,
            input: { color: "#231a2a" },
          }}
        />
        <Button
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: "#c87974",
            paddingLeft: 3,
            paddingRight: 3,
          }}
          onClick={() => sendMessage(socket, username, messageInput)}
        >
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
