import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Skeleton,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useUsers } from "../../hooks/useUsers";
import SearchInput from "../../components/common/SearchInput";
import { useTranslation, localeMap } from "../../i18n";

export default function UsersTable() {
  const theme = useTheme();
  const { t, lang } = useTranslation();

  // local states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState("");

  // fetch all users (cached by react-query)
  const { data: users, isLoading, isFetching } = useUsers();

  // filter & search
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.position?.toLowerCase().includes(query.toLowerCase()) ||
        String(u.id).includes(query)
    );
  }, [users, query]);

  // pagination slice
  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  return (
    <Box>
      <Typography
        variant="h5"
        mb={3}
        fontWeight={700}
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        {t("usersTitle")}
      </Typography>

      {/* Search input */}
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
                : paginatedUsers.map((u) => (
                    <TableRow key={u.id} hover>
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
                        {new Date(u.createdAt).toLocaleDateString(
                          localeMap[lang]
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
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
