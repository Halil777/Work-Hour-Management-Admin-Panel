import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "./theme/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { LanguageProvider } from "./i18n";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <App />
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </React.StrictMode>
);
