import { API_URL } from "constants/urls";

const sendMessage = (socket, author, content) => (dispatch) => {
  socket.emit("chat message", { author, content });
};

export default sendMessage;
