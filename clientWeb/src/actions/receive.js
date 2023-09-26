import { setErrorHelperText } from "actions/helperTexts";
import { SET_USERNAME, DATA_UPDATE_RECEIVED } from "constants/actionTypes";
import removeReduxUsername from "actions/removeReduxUsername";

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
  dispatch(removeReduxUsername());
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

export const receiveDataUpdate = ({ users, messages }) => (dispatch) => {
  // if window is scrolled to the bottom scroll again after adding messages
  if (
    window.innerHeight + window.scrollY ===
    document.documentElement.scrollHeight
  ) {
    setTimeout(scrollToBottom, 10);
  }
  dispatch({ type: DATA_UPDATE_RECEIVED, users, messages });
};
