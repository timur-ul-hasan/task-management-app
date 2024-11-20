import { useRoutes } from "react-router";
import "./App.css";
import ThemeProviderWrapper from "src/theme/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import AppInit from "src/components/AppInit";
import routers from "./routers";
import authRoutes from "./routers/auth";

function App() {
  const auth = useAuth();
  const content = useRoutes(auth.isAuthenticated ? routers : authRoutes);
  return (
    <ThemeProviderWrapper>
      <SnackbarProvider
        maxSnack={6}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <CssBaseline />
        {auth.isInitialized ? content : <AppInit />}
      </SnackbarProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
