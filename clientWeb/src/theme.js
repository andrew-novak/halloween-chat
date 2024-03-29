import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      //main: "rgba(0, 0, 0, 0.87)",
      main: "rgb(69, 23, 70)",
      contrastText: "rgb(233, 178, 175)",
      //contrastText: "#716f6f",
    },
    error: {
      main: "#b90202",
      //contrastText: "#fff",
    },
    text: {
      primary: "#212121",
    },
    background: {
      // default: "rgb(237, 237, 237)",
      default: "#ffffff",
    },
  },
  overrides: {
    MuiCard: {
      root: {},
    },
  },
  custom: {
    elevation: 1,
    margins: {
      section: 8,
      element: 2,
    },
    colors: {
      activityInactive: "rgb(184, 184, 184)",
      activity: "rgb(94, 126, 133)",
      //activity: "rgb(92, 92, 92)",
    },
    selectionBorderWidth: 2,
    heightPercentRatios: {
      "1:1": "100%",
      "4:3": "75%",
      "3:2": "66.6%",
      "16:9": "56.25%",
    },
  },
});

theme.overrides.MuiCard.root.color = theme.palette.primary.contrastText;

theme.breakpoints.values["600px"] = 600;

export default theme;
