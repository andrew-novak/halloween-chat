import { setErrorHelperText } from "actions/helperTexts";
import { SET_USERNAME, DATA_UPDATE_RECEIVED } from "constants/actionTypes";

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
  console.log("receiveRemoveUsernameResponse");
  dispatch({ type: SET_USERNAME, username: "" });
};

export const receiveDataUpdate = ({ users, messages }) => (dispatch) => {
  dispatch({ type: DATA_UPDATE_RECEIVED, users, messages });
};
