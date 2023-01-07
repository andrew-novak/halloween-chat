import { SET_SNACKBAR, CLOSE_SNACKBAR } from "constants/actionTypes";

const initialState = {
  isOpen: false,
  severity: "info",
  message: "",
};

const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        isOpen: true,
        severity: action.severity,
        message: action.message,
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        isOpen: false,
        message: "",
      };

    default:
      return state;
  }
};

export default snackbar;
