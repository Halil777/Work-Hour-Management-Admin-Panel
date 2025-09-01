import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { type ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string; // optional custom color
}

export default function StatsCard({ title, value, icon, color }: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "14px 4px 14px 4px", // 🔥 asymmetric, more powerful
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${color || "#1e1e1e"}, #0d0d0d)`
            : `linear-gradient(135deg, ${color || "#1976d2"}, #42a5f5)`,
        color: theme.palette.mode === "dark" ? "#fff" : "#fff",
        position: "relative",
        overflow: "hidden",
        padding: 1,
        minHeight: 90,
        display: "flex",
        alignItems: "center",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 6px 18px rgba(255,140,0,0.4)" // tiger glow in dark
            : "0 6px 18px rgba(25,118,210,0.25)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px) scale(1.01)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 28px rgba(255,165,0,0.6)"
              : "0 10px 28px rgba(25,118,210,0.4)",
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: "8px !important", // compact padding
        }}
      >
        <Box
          sx={{
            fontSize: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.4))",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, opacity: 0.85, letterSpacing: 0.5 }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              textShadow:
                theme.palette.mode === "dark"
                  ? "0 0 8px rgba(255,165,0,0.6)"
                  : "0 0 6px rgba(255,255,255,0.4)",
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
