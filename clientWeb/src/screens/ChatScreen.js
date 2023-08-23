import { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { Typography, TextField, Button, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { connect } from "react-redux";

import { API_URL } from "constants/urls";
import setSocket from "actions/setSocket";
import resetState from "actions/resetState";
import { receiveText, receiveEmoji } from "actions/receive";
import { sendText, sendEmoji } from "actions/send";
import Screen from "components/Screen";
import EmojiButton from "components/EmojiButton";
import icon from "./public-chat-icon.svg";
import emojis from "constants/emojis";

const NODE_ENV = process.env.NODE_ENV;
const SOCKET_IO_BASE = process.env.REACT_APP_SOCKET_IO_BASE;
const SOCKET_IO_PATH = process.env.REACT_APP_SOCKET_IO_PATH;

const ChatScreen = ({
  username,
  socket,
  messages,
  setSocket,
  resetState,
  receiveText,
  receiveEmoji,
  sendText,
  sendEmoji,
}) => {
  const theme = useTheme();

  const [messageInput, setMessageInput] = useState("");
  const [isDisplayingEmojis, setIsDisplayingEmojis] = useState(false);

  useEffect(() => {
    console.log(
      `An attempt to establish a connection to Socket.IO using following:`
    );
    console.log("--- Socket.IO base:", SOCKET_IO_BASE);
    console.log("--- Socket.IO path:", SOCKET_IO_PATH);
    const socket = io.connect(
      NODE_ENV === "production" ? SOCKET_IO_BASE : API_URL,
      {
        path: NODE_ENV === "production" && SOCKET_IO_PATH,
      }
    );

    socket.on("connect", () => {
      console.log("Connected.");
      setSocket(socket);
    });
    socket.on("disconnect", () => {
      setSocket(null);
    });
    socket.on("text message", receiveText);
    socket.on("emoji message", receiveEmoji);
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

  const submitText = () => {
    sendText(socket, username, messageInput);
    setMessageInput("");
  };

  const submitEmoji = (emojiName) => {
    sendEmoji(socket, username, emojiName);
    setIsDisplayingEmojis(false);
  };

  return (
    <Screen>
      {/* Header */}
      <div
        style={{
          position: "fixed",
          //height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d0837e",
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              height: 64,
              width: 64,
              marginRight: 15,
            }}
          >
            <img
              style={{
                position: "absolute",
                //height: isLargerThanSm ? 50 : 46,
                height: 64,
                width: 64,
                filter: "blur(0.5px)",
              }}
              alt="logo"
              src={icon}
            />
            <img
              style={{
                position: "absolute",
                //height: isLargerThanSm ? 50 : 46,
                height: 64,
                width: 64,
              }}
              alt="logo"
              src={icon}
            />
          </div>
          <Typography
            variant="h4"
            sx={{
              fontSize: 42,
              fontFamily: "Lobster, cursive",
              color: "#682149",
              [theme.breakpoints.down("sm")]: {
                //fontSize: (42 * 3) / 4,
                display: "none",
              },
            }}
          >
            Halloween Chat
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: 24,
                color: "#40142d",
              }}
            >
              Hi,{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#40142d",
                backgroundColor: "rgba(255, 255, 255, 0.26)",
                borderRadius: "4px",
                padding: "4px 8px",
                margin: 0.5,
                gap: 0.5,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={resetState}
            >
              <Typography
                sx={{
                  fontSize: 24,
                  color: "inherit",
                  //width: 200,
                  //minWidth: 20,
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {username}
              </Typography>
              <EditIcon sx={{ fontSize: 24, color: "inherit" }} />
            </Box>
          </div>
        </div>
      </div>
      {/* Body */}
      <div
        style={{
          backgroundColor: "#451746",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: 24,
          // header/footer width + 24
          paddingTop: 74 + 24,
          paddingBottom: 56 + 24,
        }}
      >
        {messages.map(({ author, category, content, emojiName }, index) => {
          return (
            <div
              key={index}
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
              {category === "emoji" && (
                <img
                  src={emojis.find((emoji) => emoji.name === emojiName).src}
                  alt="Emoji"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "100%",
                    borderStyle: "solid",
                    borderWidth: "5px",
                    borderColor: author === username ? "#c87974" : "#45364f",
                  }}
                />
              )}
              {category === "text" && (
                <div
                  style={{
                    backgroundColor:
                      author === username ? "#c87974" : "#45364f",
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
              )}
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
        {/* Emoji Toggle */}
        {isDisplayingEmojis ? (
          <button onClick={() => setIsDisplayingEmojis(false)}>Cancel</button>
        ) : (
          <IconButton onClick={() => setIsDisplayingEmojis(true)}>
            <EmojiEmotionsIcon />
          </IconButton>
        )}
        {/* Text Input & Send Button */}
        {!isDisplayingEmojis && (
          <>
            <TextField
              label="Text..."
              value={messageInput}
              autoComplete="off"
              onChange={(event) => setMessageInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitText();
                }
              }}
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
              onClick={submitText}
            >
              Send
            </Button>
          </>
        )}
        {/* Emojis Selection */}
        {isDisplayingEmojis && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {emojis.map((emoji) => (
              <EmojiButton
                src={emoji.src}
                onClick={() => submitEmoji(emoji.name)}
              />
            ))}
          </div>
        )}
      </div>
    </Screen>
  );
};

const mapState = (state) => {
  const { username, socket, messages } = state.chat;
  return { username, socket, messages };
};

export default connect(mapState, {
  setSocket,
  resetState,
  receiveText,
  receiveEmoji,
  sendText,
  sendEmoji,
})(ChatScreen);
