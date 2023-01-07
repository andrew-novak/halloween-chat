import { SET_USERNAME, SET_SOCKET } from "constants/actionTypes";

const initialState = {
  username: "",
  socket: null,
  messages: [{ author: "Essa B|O|I", content: "Hiya bull!" }],
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.username };

    case SET_SOCKET:
      return { ...state, socket: action.socket };

    default:
      return state;
  }
};

export default chat;
