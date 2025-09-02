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
import { useTranslation, localeMap } from "../../i18n";

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
  const { t, lang } = useTranslation();

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
            {t("globalWorkers", { count: data?.workers.pagination.total ?? 0 })}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("usersId")}</TableCell>
              <TableCell>{t("usersName")}</TableCell>
              <TableCell>{t("usersPosition")}</TableCell>
              <TableCell>{t("usersTelegram")}</TableCell>
              <TableCell>{t("usersStatus")}</TableCell>
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
                    label={u.isLinked ? t("usersLinked") : t("usersUnlinked")}
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
            {t("globalWorkerHours", {
              count: data?.workerHours.pagination.total ?? 0,
            })}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("workerHoursUser")}</TableCell>
              <TableCell>{t("workerHoursDate")}</TableCell>
              <TableCell>{t("workerHoursHours")}</TableCell>
              <TableCell>{t("workerHoursTeam")}</TableCell>
              <TableCell>{t("workerHoursActivity")}</TableCell>
              <TableCell>{t("workerHoursStatus")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.workerHours.items?.map((wh) => (
              <TableRow key={wh.id} hover>
                <TableCell>{wh.user?.name ?? `000${wh.userId}`}</TableCell>
                <TableCell>
                  {new Date(wh.date).toLocaleDateString(localeMap[lang])}
                </TableCell>
                <TableCell>{Number(wh.hours).toFixed(2)}</TableCell>
                <TableCell>{wh.team ?? "-"}</TableCell>
                <TableCell>{wh.activityDescription ?? "-"}</TableCell>
                <TableCell>
                  <Chip
                    label={wh.sent ? t("workerHoursSent") : t("workerHoursDraft")}
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
            {t("globalTotals", { count: data?.totals.pagination.total ?? 0 })}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("workerHoursUser")}</TableCell>
              <TableCell>{t("totalsTotalHours")}</TableCell>
              <TableCell>{t("totalsRecords")}</TableCell>
              <TableCell>{t("totalsFirstDate")}</TableCell>
              <TableCell>{t("totalsLastDate")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.totals.items?.map((tItem) => (
              <TableRow key={tItem.userId} hover>
                <TableCell>{tItem.name}</TableCell>
                <TableCell>{tItem.totalHours}</TableCell>
                <TableCell>{tItem.recordsCount}</TableCell>
                <TableCell>
                  {tItem.firstDate
                    ? new Date(tItem.firstDate).toLocaleDateString(
                        localeMap[lang]
                      )
                    : "-"}
                </TableCell>
                <TableCell>
                  {tItem.lastDate
                    ? new Date(tItem.lastDate).toLocaleDateString(
                        localeMap[lang]
                      )
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
            {t("globalFeedback", { count: data?.feedback.pagination.total ?? 0 })}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("feedbacksWhen")}</TableCell>
              <TableCell>{t("feedbacksUser")}</TableCell>
              <TableCell>{t("feedbacksMessage")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.feedback.items?.map((f) => (
              <TableRow key={f.id} hover>
                <TableCell>
                  {new Date(f.createdAt).toLocaleString(localeMap[lang])}
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
