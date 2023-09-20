import {
  SET_SOCKET,
  SET_USERNAME,
  DATA_UPDATE_RECEIVED,
} from "constants/actionTypes";

const initialState = {
  username: "",
  socket: null,
  users: [],
  // one-message object example:
  // { author: "John", content: "Hello" }
  messages: [],
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.socket };

    case SET_USERNAME:
      return { ...state, username: action.username };

    case DATA_UPDATE_RECEIVED:
      return { ...state, users: action.users, messages: action.messages };

    default:
      return state;
  }
};

export default chat;
