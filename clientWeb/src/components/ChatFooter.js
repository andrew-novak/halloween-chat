import { useTheme, Box, IconButton, TextField, Button } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

import emojis from "constants/emojis";
import EmojiButton from "components/EmojiButton";

const ChatFooter = ({
  maxWidth,
  footerRef,
  textInputRef,
  messageInput,
  setMessageInput,
  isDisplayingEmojis,
  setIsDisplayingEmojis,
  submitText,
  submitEmoji,
}) => {
  const theme = useTheme();
  return (
    <Box
      ref={footerRef}
      sx={{
        backgroundColor: "#c87974",
        position: "fixed",
        bottom: 0,
        minHeight: 56 + 20 + "px",
        paddingTop: 10 + "px",
        paddingBottom: 10 + "px",
        display: "flex",
        alignItems: "center",
        width: "100%",

        justifyContent: "center",
        [theme.breakpoints.up("md")]: {
          justifyContent: "flex-start",
        },
        [theme.breakpoints.up("md")]: {
          justifyContent: "flex-start",
          paddingLeft: "15%",
        },
        [theme.breakpoints.up("lg")]: {
          justifyContent: "center",
          paddingLeft: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          paddingLeft: 2,
          paddingRight: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          [theme.breakpoints.up("md")]: {
            maxWidth,
            width: "70%",
          },
        }}
      >
        {/* Emoji Toggle */}
        {isDisplayingEmojis ? (
          <IconButton
            color="primary"
            sx={{
              marginRight: 2,
              backgroundColor: "rgba(255, 255, 255, 0.26)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.26)",
              },
            }}
            onClick={() => setIsDisplayingEmojis(false)}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            sx={{
              marginRight: 2,
              backgroundColor: "rgba(255, 255, 255, 0.26)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.26)",
              },
            }}
            onClick={() => setIsDisplayingEmojis(true)}
          >
            <EmojiEmotionsIcon />
          </IconButton>
        )}
        {/* Text Input & Send Button */}
        {!isDisplayingEmojis && (
          <>
            <TextField
              label="Text..."
              value={messageInput}
              inputRef={textInputRef}
              autoFocus
              multiline
              minRows={1}
              maxRows={3}
              autoComplete="off"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.26)",
                borderRadius: "4px",
                flex: 1,
              }}
              InputProps={{}}
              onChange={(event) => setMessageInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault(); // Prevent newline
                  submitText();
                }
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon sx={{ fontSize: 24 }} />}
              sx={{
                fontSize: 24,
                marginLeft: 2,
                marginRight: 2,
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
              //paddingLeft: 16,
              //paddingRight: 16,
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
      </Box>
    </Box>
  );
};

export default ChatFooter;
