import { ADD_MESSAGE } from "constants/actionTypes";

export const receiveText = (message) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, message: { category: "text", ...message } });
};

export const receiveEmoji = (message) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, message: { category: "emoji", ...message } });
};
