import { useRef, useState, useEffect } from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Users from "components/Users";
import emojis from "constants/emojis";

const ChatBody = ({ maxWidth, users, messages, username, footerHeight }) => {
  const theme = useTheme();

  const messagesRef = useRef(null);
  const [marginsWidth, setMarginsWidth] = useState(0);

  useEffect(() => {
    const handleWidthChange = () => {
      const width =
        document.documentElement.clientWidth - messagesRef.current.offsetWidth;
      //const width = window.innerWidth - messagesRef.current.offsetWidth;
      setMarginsWidth(width);
    };
    window.addEventListener("resize", handleWidthChange);
    handleWidthChange();
    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const headerHeight = 72;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#341134",
        display: "flex",
        flex: 1,
        overflowX: "hidden",
        justifyContent: "flex-start",
        [theme.breakpoints.up("md")]: {
          paddingLeft: "15%",
        },
        [theme.breakpoints.up("lg")]: {
          justifyContent: "center",
          paddingLeft: 0,
        },
      }}
    >
      <Box
        ref={messagesRef}
        sx={{
          position: "relative",
          backgroundColor: "#451746",
          paddingTop: headerHeight + "px",
          paddingBottom: footerHeight + "px",
          maxWidth,
          width: "100%",
          [theme.breakpoints.up("sm")]: {
            width: "70%",
          },
          [theme.breakpoints.up("600px")]: {
            width: "100%",
          },
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: 24,
            paddingBottom: 32,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              display: marginsWidth > 100 ? "flex" : "none",
              flexDirection: "column",
              alignItems: "flex-start",
              top: headerHeight,
              right: 0,
              width: marginsWidth,
              [theme.breakpoints.up("md")]: {
                width: `calc(${marginsWidth}px - 15%)`,
              },
              [theme.breakpoints.up("lg")]: {
                width: marginsWidth / 2,
              },
              /*
              right: marginsWidth > 300 ? -300 : -marginsWidth,
              width: marginsWidth > 300 ? 300 : marginsWidth,
              [theme.breakpoints.up("lg")]: {
                right: marginsWidth > 600 ? -300 : -marginsWidth / 2,
                width: marginsWidth > 600 ? 300 : marginsWidth / 2,
              },
              */
            }}
          >
            <Users users={users} />
          </Box>
          {messages.map(({ author, category, content, emojiName }, index) => {
            const isUsernameShown =
              author !== username &&
              (index === 0 || author !== messages[index - 1].author);
            return (
              <div
                key={index}
                style={{
                  marginTop: index !== 0 && 8,
                  marginBottom:
                    messages[index + 1] &&
                    messages[index + 1].author !== author &&
                    17,
                  paddingBottom:
                    isUsernameShown && category === "emoji" && 24 + 70,
                  //(category === "emoji" &&
                  //messages[index + 1]?.category === "emoji" && // 17
                  height: category === "emoji" && "70px",
                  // author's messages on right side
                  alignSelf: author === username && "end",
                }}
              >
                {/* Author Username */}
                {/* Do not show  */}
                {isUsernameShown && (
                  <div>
                    <Typography
                      style={{
                        color: "#f2857e",
                        //color: "#231a2a",
                        fontSize: 16,
                        // text breaking
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        hyphens: "auto",
                      }}
                    >
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
                      overflow: "hidden",
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
                        // text breaking
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        hyphens: "auto",
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
        {/* Scroll Down Button */}
        <div
          style={{
            position: "fixed",
            height: 40,
            width: `calc(100% - ${marginsWidth}px)`,
            bottom: 72,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            sx={{ color: "#c87974", flexShrink: 0 }}
            onClick={scrollToBottom}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default ChatBody;
