import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { connect } from "react-redux";

import icon from "assets/brand-icon.svg";
import { clearHelperText } from "actions/helperTexts";
import { receiveSelectUsernameResponse } from "actions/receive";
import Screen from "components/Screen";

const EnterUsernameScreen = ({
  helperTexts,
  socket,
  clearHelperText,
  receiveSelectUsernameResponse,
}) => {
  const [usernameInput, setUsernameInput] = useState("");

  // listening to "select_username" response
  useEffect(() => {
    if (socket) {
      socket.on("select_username_response", receiveSelectUsernameResponse);
      return () => {
        socket.off("select_username_response", receiveSelectUsernameResponse);
      };
    }
  }, [socket]);

  const submitUsername = (usernameInput) => {
    if (!socket) return alert("Connection problem.");
    if (socket) {
      socket.emit("select_username", usernameInput);
    }
  };

  // listen to "enter" key down
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        submitUsername(usernameInput);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [usernameInput]);

  return (
    <Screen>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgb(208, 131, 126)",
        }}
      >
        <div
          style={{
            paddingTop: "10vh",
            //height: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 64 * 2,
              width: 64 * 2,
              marginRight: 15,
            }}
          >
            <img
              style={{
                position: "absolute",
                height: 64 * 2,
                width: 64 * 2,
                filter: "blur(0.5px)",
              }}
              alt="logo"
              src={icon}
            />
            <img
              style={{
                position: "absolute",
                height: 64 * 2,
                width: 64 * 2,
              }}
              alt="logo"
              src={icon}
              onDragStart={(event) => event.preventDefault()}
            />
          </div>
          <Typography
            variant="h4"
            sx={{
              fontSize: 42,
              fontFamily: "Lobster, cursive",
              color: "#682149",
            }}
          >
            Halloween Chat
          </Typography>
          <Typography
            align="center"
            sx={{ width: 261, paddingTop: 0.5, paddingBottom: 2 }}
          >
            Welcome to Halloween Chat
          </Typography>
          <TextField
            label="Your username"
            value={usernameInput}
            error={helperTexts.usernameInput.isError}
            helperText={helperTexts.usernameInput.text}
            autoFocus
            autoComplete="off"
            sx={{ width: 261, paddingBottom: 2 }}
            onChange={(event) => {
              setUsernameInput(event.target.value);
              // clear helperText if any
              if (helperTexts.usernameInput.text) {
                clearHelperText("usernameInput");
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ width: 261 /*, color: "rgb(208, 131, 126)"*/ }}
            onClick={() => submitUsername(usernameInput)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Screen>
  );
};

const mapState = (state) => {
  const { helperTexts } = state;
  const { socket } = state.chat;
  return { helperTexts, socket };
};

export default connect(mapState, {
  clearHelperText,
  receiveSelectUsernameResponse,
})(EnterUsernameScreen);
