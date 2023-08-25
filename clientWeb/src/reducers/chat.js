import {
  SET_USERNAME,
  SET_SOCKET,
  SET_USER_LIST,
  ADD_MESSAGE,
} from "constants/actionTypes";

const initialState = {
  username: "",
  socket: null,
  userList: [],
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

    case SET_USER_LIST:
      return { ...state, userList: action.userList };

    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };

    default:
      return state;
  }
};

export default chat;
