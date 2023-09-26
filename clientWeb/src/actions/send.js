import removeReduxUsername from "actions/removeReduxUsername";
import { API_URL } from "constants/env";

export const sendRemoveUsername = (socket) => (dispatch) => {
  console.log("socket:", socket);
  if (!socket) {
    dispatch(removeReduxUsername());
  }
  try {
    socket.emit("remove_username");
  } catch (err) {
    console.error(
      "An error occured during a remove username send attempt:",
      err
    );
  }
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
  });
};

export const sendText = (socket, author, content) => (dispatch) => {
  setTimeout(scrollToBottom, 100);
  if (content.length < 1) return;
  try {
    socket.emit("text_message", { author, content });
  } catch (err) {
    console.error("An error occured during a text message send attempt:", err);
  }
};

export const sendEmoji = (socket, author, emojiName) => (dispatch) => {
  setTimeout(scrollToBottom, 100);
  try {
    socket.emit("emoji_message", { author, emojiName });
  } catch (err) {
    console.error(
      "An error occured during an emoji message send attempt:",
      err
    );
  }
};
