import io from "socket.io-client";

import { API_URL } from "constants/urls";
import { SET_SOCKET } from "constants/actionTypes";

const connectToSocket = () => (dispatch) => {
  const socket = io.connect(API_URL);
  dispatch({ type: SET_SOCKET, socket });
  socket.on("message", (data) => {
    console.log("socket message");
  });
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
};

export default connectToSocket;
