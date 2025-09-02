import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { type ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useColorMode } from "../theme/ThemeProvider";
import { useTranslation } from "../i18n";
import LanguageSwitcher from "../components/common/LanguageSwitcher";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import useUnreadFeedbackCount from "../hooks/useUnreadFeedbackCount";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { toggle, mode } = useColorMode();
  const { t } = useTranslation();
  const unread = useUnreadFeedbackCount();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          background:
            mode === "dark"
              ? "linear-gradient(90deg,#ff6f00,#ff9800)" // Tiger glow
              : "linear-gradient(90deg,#1976d2,#42a5f5)", // Premium blue
          boxShadow:
            mode === "dark"
              ? "0 4px 20px rgba(255,140,0,0.35)"
              : "0 4px 20px rgba(25,118,210,0.25)",
          borderBottom:
            mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {t("appTitle")}
          </Typography>
          <IconButton color="inherit" component={Link} to="/feedbacks">
            <Badge color="error" badgeContent={unread} invisible={unread === 0}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <LanguageSwitcher />
          <IconButton color="inherit" onClick={toggle}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          bgcolor: "background.default",
          background:
            mode === "dark"
              ? "linear-gradient(180deg,#121212,#1e1e1e)"
              : "linear-gradient(180deg,#f8f9fc,#e3f2fd)",
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
