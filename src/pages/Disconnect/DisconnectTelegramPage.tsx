import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stack,
  useTheme,
} from "@mui/material";
import { api } from "../../api/client";

export default function DisconnectTelegramPage() {
  const theme = useTheme();
  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDisconnect = async () => {
    if (!telegramId.trim()) {
      setError("Telegram ID is required");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const res = await api.post("/admin/disconnect-telegram", {
        telegramId,
      });

      setResult(res.data);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to disconnect Telegram ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        mb={3}
        fontWeight={700}
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        Disconnect Telegram
      </Typography>

      <Paper
        sx={{
          p: 4,
          borderRadius: "14px 4px 14px 4px",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg,#121212,#1f1f1f)"
              : "linear-gradient(135deg,#fefefe,#f5f8fa)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 6px 20px rgba(255,140,0,0.35)"
              : "0 6px 20px rgba(25,118,210,0.25)",
        }}
      >
        <Stack spacing={3}>
          <TextField
            label="Telegram ID"
            value={telegramId}
            onChange={(e) => setTelegramId(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleDisconnect}
            disabled={loading}
            sx={{ fontWeight: 600 }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Disconnect"
            )}
          </Button>

          {error && <Alert severity="error">{error}</Alert>}

          {result && (
            <Alert severity="success">
              {result.message}
              <ul>
                {result.users.map((u: any) => (
                  <li key={u.id}>
                    {u.name} (ID: {u.id})
                  </li>
                ))}
              </ul>
            </Alert>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
