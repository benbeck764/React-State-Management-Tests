import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppContent from "./AppContent";
import { getTheme } from "./theme/theme";
import CustomThemeProvider from "@benbeck764/react-components/theme";
import { store } from "./state/store";
import { Provider as ReduxProvider } from "react-redux";

const App: FC = () => {
  const theme = getTheme();

  return (
    <ReduxProvider store={store}>
      <CustomThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <AppContent />
        </Router>
      </CustomThemeProvider>
    </ReduxProvider>
  );
};

export default App;
