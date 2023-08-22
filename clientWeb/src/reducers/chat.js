import { SET_USERNAME, SET_SOCKET, ADD_MESSAGE } from "constants/actionTypes";

const initialState = {
  username: "",
  socket: null,
  // one-message object example:
  // { author: "John", content: "Hello" }
  messages: [],
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.username };

    case SET_SOCKET:
      return { ...state, socket: action.socket };

    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };

    default:
      return state;
  }
};

export default chat;
