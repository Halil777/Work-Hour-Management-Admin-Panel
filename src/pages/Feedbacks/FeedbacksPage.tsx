import { Box, Typography, Paper, useTheme, Stack } from "@mui/material";
import { useFeedbacks } from "../../hooks/useFeedbacks";
import FeedbacksTable from "./FeedbacksTable";
import CountUp from "react-countup";
import { useState } from "react";
import FilterFeedback from "./FilterFeedback";
import SearchFeedback from "./SearchFeedback";
import { useTranslation } from "../../i18n";

export default function FeedbacksPage() {
  const { data, isLoading, isFetching } = useFeedbacks();
  const theme = useTheme();

  // state for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { t } = useTranslation();

  // diňe INCORRECT_TIME hasapla
  const incorrect = (data || []).filter((f) => f.action === "INCORRECT_TIME");

  return (
    <Box>
      <Typography
        variant="h5"
        mb={1}
        fontWeight={700}
        sx={{
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {t("menuFeedbacks")}
      </Typography>

      {/* Сан INCORRECT_TIME bilen */}
      <Stack direction="row" my={3} spacing={2}>
        <Typography
          variant="subtitle1"
          mb={2}
          sx={{
            fontWeight: 600,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.warning.light
                : theme.palette.primary.main,
          }}
        >
          {t("feedbacksShown", { count: incorrect.length })}
      </Typography>
      </Stack>

      {/* Filter + Search */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <FilterFeedback
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
        <SearchFeedback value={searchQuery} onChange={setSearchQuery} />
      </Stack>

      <Paper
        sx={{
          borderRadius: "14px 4px 14px 4px",
          overflow: "hidden",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg,#121212,#1f1f1f)"
              : "linear-gradient(135deg,#fefefe,#f5f8fa)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 6px 20px rgba(255,140,0,0.35)"
              : "0 6px 20px rgba(25,118,210,0.25)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 10px 28px rgba(255,140,0,0.55)"
                : "0 10px 28px rgba(25,118,210,0.4)",
          },
        }}
      >
        <FeedbacksTable
          data={data || []}
          isLoading={isLoading}
          isFetching={isFetching}
          searchQuery={searchQuery}
          selectedDate={selectedDate}
        />
      </Paper>
    </Box>
  );
}
