import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  useTheme,
  CircularProgress,
  Box,
  Tooltip,
  Snackbar,
  Alert,
  IconButton,
  TablePagination,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import type { Feedback } from "../../hooks/useFeedbacks";
import FeedbackResponseDialog from "./FeedbackResponseDialog";
import { useTranslation, localeMap } from "../../i18n";

interface Props {
  data: Feedback[];
  isLoading: boolean;
  isFetching: boolean;
  onResponded?: (id: number) => void;
  searchQuery: string;
  selectedDate: Date | null;
}

export default function FeedbacksTable({
  data,
  isLoading,
  isFetching,
  onResponded,
  searchQuery,
  selectedDate,
}: Props) {
  const theme = useTheme();
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const { t, lang } = useTranslation();

  // pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // filter INCORRECT_TIME only
  let filtered = data.filter((f) => f.action === "INCORRECT_TIME");

  // search by name
  if (searchQuery) {
    filtered = filtered.filter((f) =>
      f.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // filter by selected date
  if (selectedDate) {
    filtered = filtered.filter((f) => {
      if (!f.workerHours?.date) return false;
      const d = new Date(f.workerHours.date);
      return (
        d.getFullYear() === selectedDate.getFullYear() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getDate() === selectedDate.getDate()
      );
    });
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const copyToClipboard = (text: string, labelKey: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar(`${t(labelKey)} ${t("copied")}`);
  };

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Table
        sx={{
          borderCollapse: "collapse",
          "& td, & th": {
            borderRight: `1px solid ${
              theme.palette.mode === "dark" ? "#333" : "#ddd"
            }`,
          },
          "& td:last-child, & th:last-child": { borderRight: "none" },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? "#1f1f1f"
                  : "rgba(25,118,210,0.08)",
            }}
          >
            {[
              t("feedbacksUser"),
              t("feedbacksPosition"),
              t("feedbacksTelegram"),
              t("feedbacksMessage"),
              t("feedbacksActions"),
            ].map((head) => (
              <TableCell
                key={head}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontSize: "0.75rem",
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton height={30} />
                </TableCell>
              </TableRow>
            ))
          ) : paginated.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                {t("feedbacksNone")}
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((f) => (
              <TableRow key={f.id} hover>
                {/* User */}
                <TableCell>
                  <Tooltip title={t("copyName")}>
                    <span
                      style={{
                        cursor: "pointer",
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                      onClick={() => copyToClipboard(f.user.name, "nameLabel")}
                    >
                      {f.user.name}
                    </span>
                  </Tooltip>
                </TableCell>

                {/* Position */}
                <TableCell>{f.user.position}</TableCell>

                {/* Telegram */}
                <TableCell>
                  {f.user.telegramId ? (
                    <Tooltip title={t("copyTelegram")}>
                      <span
                        style={{
                          cursor: "pointer",
                          color: theme.palette.secondary.main,
                        }}
                        onClick={() =>
                          copyToClipboard(f.user.telegramId!, "telegramIdLabel")
                        }
                      >
                        {f.user.telegramId}
                      </span>
                    </Tooltip>
                  ) : (
                    "-"
                  )}
                </TableCell>

                {/* Message */}
                <TableCell>
                  📅{" "}
                  {f.workerHours?.date
                    ? new Date(f.workerHours.date).toLocaleDateString(
                        localeMap[lang]
                      )
                    : "-"}{" "}
                  — {t("feedbacksWorkerReported")}: <b>{f.message.match(/\d+/)?.[0]} {t("hoursShort")}</b>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <IconButton onClick={() => setSelected(f)}>
                    <ReplyIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {isFetching && (
        <Box textAlign="center" py={2}>
          <CircularProgress size={20} />
        </Box>
      )}

      {selected && (
        <FeedbackResponseDialog
          feedback={selected}
          onClose={() => setSelected(null)}
          onResponded={(id) => {
            onResponded?.(id);
            setSelected(null);
          }}
        />
      )}

      {/* Snackbar notification */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={2000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ fontWeight: 600 }}>
          {snackbar}
        </Alert>
      </Snackbar>
    </>
  );
}
