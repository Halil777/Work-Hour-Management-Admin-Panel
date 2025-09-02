import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Badge,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FeedbackIcon from "@mui/icons-material/Feedback";
import UploadIcon from "@mui/icons-material/UploadFile";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { useTranslation } from "../../i18n";
import useUnreadFeedbackPolling from "../../hooks/useUnreadFeedbackPolling";

const menu = [
  { text: "menuDashboard", path: "/", icon: <DashboardIcon /> },
  { text: "menuUsers", path: "/users", icon: <PeopleIcon /> },
  { text: "menuFeedbacks", path: "/feedbacks", icon: <FeedbackIcon /> },
  { text: "menuWorkerHours", path: "/worker-hours", icon: <AccessTimeIcon /> },
  { text: "menuUploads", path: "/uploads", icon: <UploadIcon /> },
  {
    text: "menuDisconnect",
    path: "/disconnect-telegram",
    icon: <LinkOffIcon />,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();
  const unread = useUnreadFeedbackPolling(5000);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        [`& .MuiDrawer-paper`]: {
          width: 220,
          borderRight: "none",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #0d0d0d 0%, #1c1c1c 100%)"
              : "linear-gradient(180deg,#fdfdfd,#f4f7fa)",
          color: theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
          boxShadow:
            theme.palette.mode === "dark"
              ? "4px 0 20px rgba(255,165,0,0.15)"
              : "4px 0 20px rgba(0,0,0,0.05)",
        },
        pt: 40,
      }}
    >
      <List sx={{ mt: 10 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              m: "6px 12px",
              py: 1,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateX(6px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 14px rgba(255,140,0,0.4)"
                    : "0 4px 14px rgba(25,118,210,0.25)",
              },
              "&.Mui-selected": {
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg,#ff6f00,#ff9800)"
                    : "linear-gradient(90deg,#1976d2,#42a5f5)",
                color: "#fff",
                "& .MuiListItemIcon-root": { color: "#fff" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {item.text === "menuFeedbacks" && unread > 0 ? (
                <Badge color="error" badgeContent={unread}>
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText
              primary={t(item.text)}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
