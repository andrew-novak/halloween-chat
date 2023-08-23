import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { connect } from "react-redux";

import icon from "./public-chat-icon.svg";
import { setUsername } from "actions/user";
import Screen from "components/Screen";

const EnterUsernameScreen = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
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
            autoComplete="off"
            sx={{ width: 261, paddingBottom: 2 }}
            onChange={(event) => setUsernameInput(event.target.value)}
          />
          <Button
            variant="contained"
            sx={{ width: 261 /*, color: "rgb(208, 131, 126)"*/ }}
            onClick={() => setUsername(usernameInput)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Screen>
  );
};

export default connect(null, { setUsername })(EnterUsernameScreen);
