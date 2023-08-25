import { SET_HELPER_TEXT } from "constants/actionTypes";

const initialState = {
  usernameInput: { text: "", isError: false },
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_HELPER_TEXT:
      return {
        ...state,
        [action.field]: {
          text: action.helperText,
          isError: action.isError,
        },
      };

    default:
      return state;
  }
};

export default chat;
