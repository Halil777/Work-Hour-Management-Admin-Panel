import { Box, Container } from "@mui/material";
import { type ReactNode } from "react";
import LanguageSwitcher from "../components/common/LanguageSwitcher";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <LanguageSwitcher />
      </Box>
      <Container maxWidth="xs">{children}</Container>
    </Box>
  );
}

