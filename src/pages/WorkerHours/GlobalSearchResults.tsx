import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableFooter,
  TablePagination,
  Typography,
  LinearProgress,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";

interface Props {
  q: string;
  dateFrom?: string;
  dateTo?: string;
}

const rowsPerPageOptions = [5, 10, 25];

export default function GlobalSearchResults({ q, dateFrom, dateTo }: Props) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching } = useGlobalSearch(
    q,
    page + 1,
    limit,
    dateFrom,
    dateTo
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Stack spacing={4}>
      {(isLoading || isFetching) && <LinearProgress />}

      {/* Workers */}
      <TableContainer component={Paper}>
        <Box p={2}>
          <Typography variant="h6">
            Workers ({data?.workers.pagination.total ?? 0})
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Telegram</TableCell>
              <TableCell>Linked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.workers.items?.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell>000{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.position || "-"}</TableCell>
                <TableCell>{u.telegramId || "-"}</TableCell>
                <TableCell>
                  <Chip
                    label={u.isLinked ? "Linked" : "Not linked"}
                    size="small"
                    color={u.isLinked ? "success" : "warning"}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={data?.workers.pagination.total ?? 0}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Worker Hours */}
      <TableContainer component={Paper}>
        <Box p={2}>
          <Typography variant="h6">
            Worker Hours ({data?.workerHours.pagination.total ?? 0})
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.workerHours.items?.map((wh) => (
              <TableRow key={wh.id} hover>
                <TableCell>{wh.user?.name ?? `000${wh.userId}`}</TableCell>
                <TableCell>
                  {new Date(wh.date).toLocaleDateString("ru-RU")}
                </TableCell>
                <TableCell>{Number(wh.hours).toFixed(2)}</TableCell>
                <TableCell>{wh.team ?? "-"}</TableCell>
                <TableCell>{wh.activityDescription ?? "-"}</TableCell>
                <TableCell>
                  <Chip
                    label={wh.sent ? "Sent" : "Draft"}
                    size="small"
                    color={wh.sent ? "success" : "warning"}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Totals */}
      <TableContainer component={Paper}>
        <Box p={2}>
          <Typography variant="h6">
            Totals ({data?.totals.pagination.total ?? 0})
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Records</TableCell>
              <TableCell>First Date</TableCell>
              <TableCell>Last Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.totals.items?.map((t) => (
              <TableRow key={t.userId} hover>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.totalHours}</TableCell>
                <TableCell>{t.recordsCount}</TableCell>
                <TableCell>
                  {t.firstDate
                    ? new Date(t.firstDate).toLocaleDateString("ru-RU")
                    : "-"}
                </TableCell>
                <TableCell>
                  {t.lastDate
                    ? new Date(t.lastDate).toLocaleDateString("ru-RU")
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Feedback */}
      <TableContainer component={Paper}>
        <Box p={2}>
          <Typography variant="h6">
            Feedback ({data?.feedback.pagination.total ?? 0})
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>When</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.feedback.items?.map((f) => (
              <TableRow key={f.id} hover>
                <TableCell>
                  {new Date(f.createdAt).toLocaleString("ru-RU")}
                </TableCell>
                <TableCell>{f.user?.name ?? `000${f.userId}`}</TableCell>
                <TableCell>{f.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
