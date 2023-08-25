import { SET_HELPER_TEXT } from "constants/actionTypes";

export const clearHelperText = (field) => (dispatch) =>
  dispatch({
    type: SET_HELPER_TEXT,
    field,
    helperText: "",
    isError: false,
  });

export const setHelperText = (field, helperText) => (dispatch) =>
  dispatch({
    type: SET_HELPER_TEXT,
    field,
    helperText,
    isError: false,
  });

export const setErrorHelperText = (field, helperText) => (dispatch) =>
  dispatch({
    type: SET_HELPER_TEXT,
    field,
    helperText,
    isError: true,
  });
