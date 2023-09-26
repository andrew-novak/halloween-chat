import { SET_USERNAME } from "constants/actionTypes";

const removeReduxUsername = () => (dispatch) => {
  dispatch({ type: SET_USERNAME, username: "" });
};

export default removeReduxUsername;
