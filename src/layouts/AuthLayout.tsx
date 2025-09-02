import { Box, Container } from "@mui/material";
import { type ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xs">{children}</Container>
    </Box>
  );
}

