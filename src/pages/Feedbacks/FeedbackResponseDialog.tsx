import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import type { Feedback } from "../../hooks/useFeedbacks";
import { api } from "../../api/client";

interface Props {
  feedback: Feedback;
  onClose: () => void;
  onResponded?: (id: number) => void; // parent status update üçin
}

export default function FeedbackResponseDialog({
  feedback,
  onClose,
  onResponded,
}: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleSend = async () => {
    if (!message.trim()) {
      setError("Response message cannot be empty");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      await api.post("/admin/response-user-message", {
        userId: feedback.user.id,
        workerHoursId: feedback.workerHoursId || null,
        message,
      });

      // parent state update
      onResponded?.(feedback.id);
      onClose();
    } catch (e) {
      setError("Failed to send response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg,#1f1f1f,#121212)"
              : "linear-gradient(90deg,#1976d2,#42a5f5)",
          color: "#fff",
        }}
      >
        Ответ пользователю: {feedback.user.name}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Сообщение от пользователя:
        </Typography>
        <Box
          sx={{
            p: 1.5,
            mb: 2,
            borderRadius: "10px 3px 10px 3px",
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,140,0,0.1)"
                : "rgba(25,118,210,0.08)",
          }}
        >
          <Typography variant="body2">{feedback.message}</Typography>
        </Box>

        <TextField
          fullWidth
          label="Ваш ответ"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            mt: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px 3px 10px 3px",
            },
          }}
        />

        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 1, fontWeight: 600 }}
          >
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            fontWeight: 600,
            borderRadius: "8px 2px 8px 2px",
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          disabled={loading}
          sx={{
            fontWeight: 600,
            borderRadius: "8px 2px 8px 2px",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 3px 10px rgba(255,140,0,0.4)"
                : "0 3px 10px rgba(25,118,210,0.3)",
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Отправить"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
