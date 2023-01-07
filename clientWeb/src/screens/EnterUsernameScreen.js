import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { connect } from "react-redux";

import { setUsername } from "actions/user";
import Screen from "components/Screen";

const EnterUsernameScreen = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  return (
    <Screen>
      <Typography>Welcome to Public Chat</Typography>
      <TextField
        label="Enter username"
        value={usernameInput}
        onChange={(event) => setUsernameInput(event.target.value)}
      />
      <Button onClick={() => setUsername(usernameInput)}>Confirm</Button>
    </Screen>
  );
};

export default connect(null, { setUsername })(EnterUsernameScreen);
