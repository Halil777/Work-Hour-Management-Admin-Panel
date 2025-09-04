import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import type { Feedback } from "../../hooks/useFeedbacks";
import { useTranslation } from "../../i18n";

interface Props {
  feedback: Feedback;
  onClose: () => void;
}

export default function FeedbackAnswerDialog({ feedback, onClose }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

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
        {t("feedbackResponseTitle", { name: feedback.user.name })}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          {t("feedbackResponseUserMessage")}
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

        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          {t("feedbackResponseAdminMessage")}
        </Typography>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "10px 3px 10px 3px",
            background:
              theme.palette.mode === "dark"
                ? "rgba(76,175,80,0.1)"
                : "rgba(76,175,80,0.08)",
          }}
        >
          <Typography variant="body2">{feedback.response}</Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            fontWeight: 600,
            borderRadius: "8px 2px 8px 2px",
          }}
        >
          {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
