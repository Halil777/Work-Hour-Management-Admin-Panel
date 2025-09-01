import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" }, // Light azure
    secondary: { main: "#ce93d8" }, // Light royal purple
    background: {
      default: "#0e1117", // Graphite black
      paper: "#1c1f26", // Rich dark blue-gray
    },
    text: {
      primary: "#f5f7fa",
      secondary: "#aeb4c2",
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
          background: "linear-gradient(90deg,#0d47a1,#1565c0)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.6)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background:
            "linear-gradient(180deg, rgba(28,31,38,1) 0%, rgba(18,20,26,1) 100%)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 10px 28px rgba(0,0,0,0.65)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
  },
});
