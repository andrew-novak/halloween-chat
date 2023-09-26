import {
  useTheme,
  useMediaQuery,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EditIcon from "@mui/icons-material/Edit";

import icon from "assets/brand-icon.svg";

const ChatHeader = ({ username, removeUsername, showUsersModal }) => {
  const theme = useTheme();
  const isMaxSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMax600 = useMediaQuery("(max-width:600px)");
  return (
    <div
      style={{
        height: 72,
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
            onDragStart={(event) => event.preventDefault()}
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
            onDragStart={(event) => event.preventDefault()}
          />
        </div>
        <Typography
          variant="h4"
          sx={{
            fontSize: 42,
            fontFamily: "Lobster, cursive",
            color: "#682149",
            [theme.breakpoints.down("md")]: {
              //fontSize: (42 * 3) / 4,
              display: "block",
              fontSize: 32,
              lineHeight: 0.8,
            },
            [theme.breakpoints.down("sm")]: {
              display: "none",
              fontSize: 20,
              //fontSize: (42 * 3) / 4,
            },
          }}
        >
          Halloween {isMaxSm && <br />}Chat
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
            onClick={removeUsername}
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
          {isMax600 && (
            <IconButton
              color="primary"
              sx={{ marginLeft: 1 }}
              onClick={showUsersModal}
            >
              <PeopleAltIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
