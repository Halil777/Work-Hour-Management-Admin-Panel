import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1565c0" }, // Royal blue
    secondary: { main: "#8e24aa" }, // Purple elegance
    background: {
      default: "#f3f6fb", // Soft pastel grey-blue
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1c1e",
      secondary: "#555a64",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "Inter, 'Segoe UI', sans-serif",
    h5: { fontWeight: 700, letterSpacing: "-0.3px" },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #1565c0, #42a5f5)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          background: "linear-gradient(180deg,#ffffff 0%,#f9fbfd 100%)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        },
      },
    },
  },
});
