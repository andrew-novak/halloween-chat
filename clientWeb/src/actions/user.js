import { SET_USERNAME } from "constants/actionTypes";

export const setUsername = (username) => (dispatch) => {
  dispatch({ type: SET_USERNAME, username });
};
