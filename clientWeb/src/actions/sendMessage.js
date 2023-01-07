import { API_URL } from "constants/urls";

const sendMessage = (socket, message) => (dispatch) => {
  socket.emit("chat message", message);
};

export default sendMessage;
