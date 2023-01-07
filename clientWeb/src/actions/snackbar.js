import { SET_SNACKBAR, CLOSE_SNACKBAR } from "constants/actionTypes";

export const setErrorSnackbar = (message) => (dispatch) =>
  dispatch({ type: SET_SNACKBAR, severity: "error", message });

export const setWarningSnackbar = (message) => (dispatch) =>
  dispatch({ type: SET_SNACKBAR, severity: "warning", message });

export const setInfoSnackbar = (message) => (dispatch) =>
  dispatch({ type: SET_SNACKBAR, severity: "info", message });

export const setSuccessSnackbar = (message) => (dispatch) =>
  dispatch({ type: SET_SNACKBAR, severity: "success", message });

export const closeSnackbar = () => (dispatch) =>
  dispatch({ type: CLOSE_SNACKBAR });
