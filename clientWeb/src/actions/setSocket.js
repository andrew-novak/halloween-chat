import { SET_SOCKET } from "constants/actionTypes";

const setSocket = (socket) => (dispatch) => {
  dispatch({ type: SET_SOCKET, socket });
};

export default setSocket;
