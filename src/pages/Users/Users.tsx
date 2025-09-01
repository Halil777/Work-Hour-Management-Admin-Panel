import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Chip,
  CircularProgress,
  Skeleton,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSearchUsers } from "../../hooks/useUsers";
import SearchInput from "../../components/common/SearchInput";
import { useTranslation } from "../../i18n";

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const { data, isLoading, isFetching } = useSearchUsers(
    page + 1,
    rowsPerPage,
    query
  );
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h5"
        mb={3}
        fontWeight={700}
        sx={{
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {t("usersTitle")}
      </Typography>

      {/* Search */}
      <Box mb={2}>
        <SearchInput value={query} onChange={setQuery} />
      </Box>

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
        <TableContainer>
          <Table>
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
                  t("usersId"),
                  t("usersName"),
                  t("usersPosition"),
                  t("usersStatus"),
                  t("usersTelegram"),
                  t("usersCreatedAt"),
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
              {isLoading
                ? [...Array(rowsPerPage)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6}>
                        <Skeleton height={30} />
                      </TableCell>
                    </TableRow>
                  ))
                : data?.items.map((u: any) => (
                    <TableRow
                      key={u.id}
                      hover
                      sx={{
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(255,140,0,0.1)"
                              : "rgba(25,118,210,0.08)",
                          transition: "all 0.2s ease",
                        },
                      }}
                    >
                      <TableCell>{u.id}</TableCell>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.position}</TableCell>
                      <TableCell>
                        {u.isLinked ? (
                          <Chip
                            label={t("usersLinked")}
                            color="success"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        ) : (
                          <Chip
                            label={t("usersUnlinked")}
                            color="default"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{u.telegramId ?? "-"}</TableCell>
                      <TableCell>
                        {new Date(u.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={data?.pagination.total || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            ".MuiTablePagination-toolbar": {
              justifyContent: "flex-end",
              fontWeight: 600,
            },
          }}
        />
      </Paper>

      {/* Fetching indicator */}
      {isFetching && (
        <Box mt={2} textAlign="center">
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t("usersUpdating")}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
