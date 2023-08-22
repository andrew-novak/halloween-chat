import { API_URL } from "constants/urls";

export const sendText = (socket, author, content) => (dispatch) => {
  socket.emit("text message", { author, content });
};

export const sendEmoji = (socket, author, emojiName) => (dispatch) => {
  socket.emit("emoji message", { author, emojiName });
};
