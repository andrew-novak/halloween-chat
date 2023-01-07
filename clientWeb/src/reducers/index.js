import { combineReducers } from "redux";

import snackbar from "./snackbar";
import chat from "./chat";
import { RESET_STATE } from "constants/actionTypes";

const appReducer = combineReducers({
  snackbar,
  chat,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
