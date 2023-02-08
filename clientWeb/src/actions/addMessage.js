import { SET_MESSAGE } from "constants/actionTypes";

const addMessage = (message) => (dispatch) => {
  dispatch({ type: SET_MESSAGE, message });
};

export default addMessage;
