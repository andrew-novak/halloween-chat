import { API_URL } from "constants/envVars";

export const sendText = (socket, author, content) => (dispatch) => {
  if (content.length < 1) return;
  try {
    socket.emit("text_message", { author, content });
  } catch (err) {
    console.error("An error occured during a text message send attempt:", err);
  }
};

export const sendEmoji = (socket, author, emojiName) => (dispatch) => {
  try {
    socket.emit("emoji_message", { author, emojiName });
  } catch (err) {
    console.error(
      "An error occured during an emoji message send attempt:",
      err
    );
  }
};
