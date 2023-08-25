import { setErrorHelperText } from "actions/helperTexts";
import {
  SET_USERNAME,
  SET_USER_LIST,
  ADD_MESSAGE,
} from "constants/actionTypes";

export const receiveSelectUsernameResponse = ({
  selectedUsername,
  errorMessage,
}) => (dispatch) => {
  if (errorMessage) {
    console.error(errorMessage);
    return dispatch(setErrorHelperText("usernameInput", errorMessage));
  }
  dispatch({ type: SET_USERNAME, username: selectedUsername });
};

export const receiveRemoveUsernameResponse = () => (dispatch) => {
  dispatch({ type: SET_USERNAME, username: "" });
};

export const receiveUserList = (userList) => (dispatch) => {
  dispatch({ type: SET_USER_LIST, userList });
};

export const receiveText = (message) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, message: { category: "text", ...message } });
};

export const receiveEmoji = (message) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, message: { category: "emoji", ...message } });
};
