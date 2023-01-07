import { SET_USERNAME } from "constants/actionTypes";

export const setUsername = (username) => (dispatch) => {
  console.log("set username: ", username);
  dispatch({ type: SET_USERNAME, username });
};
