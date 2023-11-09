import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppContent from "./AppContent";
import { getTheme } from "./theme/theme";
import CustomThemeProvider from "@benbeck764/react-components/theme";

const App: FC = () => {
  const theme = getTheme();

  return (
    <CustomThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <AppContent />
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
