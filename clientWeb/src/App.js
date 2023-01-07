import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Snackbar from "components/Snackbar";
import Routes from "./Routes";
import store from "store";
import theme from "theme";

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar />
        <Routes />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
