import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import { connect } from "react-redux";

import { closeSnackbar } from "actions/snackbar";

const Snackbar = ({ isOpen, severity, message, closeSnackbar }) => (
  <MuiSnackbar
    open={isOpen}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    onClose={closeSnackbar}
  >
    <Alert severity={severity} sx={{ width: "100%" }} onClose={closeSnackbar}>
      {message}
    </Alert>
  </MuiSnackbar>
);

const mapState = (state) => {
  const { isOpen, severity, message } = state.snackbar;
  return { isOpen, severity, message };
};

export default connect(mapState, { closeSnackbar })(Snackbar);
